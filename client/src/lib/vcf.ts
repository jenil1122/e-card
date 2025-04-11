export interface PhoneNumber {
  number: string;
  display: string;
}

export interface ContactData {
  name: string;
  title: string;
  phone: PhoneNumber[];
  workPhone?: string;
  email: string;
  website?: string;
  location: string;
  address?: string;
  photo: string;
  hours?: string;
  description?: string;
}

export type DeviceType = 'ios' | 'android' | 'other';

export function detectDevice(): DeviceType {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  } else {
    return 'other';
  }
}

export async function generateVCF(contactData: ContactData, deviceType: DeviceType): Promise<void> {
  // Split the name for VCF format
  const nameParts = contactData.name.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.pop() : '';
  const firstName = nameParts.join(' ');
  
  // Build the notes section
  const notes = [
    contactData.description || '',
    contactData.hours || ''
  ].filter(Boolean).join('\n');
  
  // Generate phone lines
  const phoneLinesArray = contactData.phone.map(phone => 
    `TEL;TYPE=CELL:${phone.number}`
  );
  const phoneLines = phoneLinesArray.join('\n');

  // Fetch image as base64 with proper sizing
  let photoData = '';
  try {
    // Create an image element to load and resize the photo properly
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    // Wait for the image to load before processing
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = contactData.photo;
    });

    // Create a canvas with appropriate dimensions to avoid cropping
    const canvas = document.createElement('canvas');
    const maxSize = 400; // Maximum size for the VCF photo
    
    // Calculate dimensions while maintaining aspect ratio
    let width = img.width;
    let height = img.height;
    
    if (width > height) {
      if (width > maxSize) {
        height = Math.round(height * (maxSize / width));
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width = Math.round(width * (maxSize / height));
        height = maxSize;
      }
    }
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Draw the image centered on the canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0)'; // Transparent background
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to base64
      photoData = canvas.toDataURL('image/jpeg', 0.9);
    }
  } catch (error) {
    console.error('Failed to process image:', error);
  }

  // Create VCF content
  const vcfData = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${contactData.name}
ORG:
TITLE:
${phoneLines}
${contactData.workPhone ? `TEL;TYPE=WORK,VOICE:${contactData.workPhone}` : ''}
EMAIL:${contactData.email}
${contactData.website ? `URL:https://${contactData.website}` : ''}
ADR;TYPE=WORK:;;${contactData.location};;;;
NOTE:${notes}
CATEGORIES:Mobile Phones and Tablets
${photoData ? `PHOTO;ENCODING=BASE64;JPEG:${photoData.split(',')[1]}` : ''}
END:VCARD`;

  // Create blob and download link
  const blob = new Blob([vcfData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'New_Abra_Ka_Dabra_contact.vcf';
  
  // Handle download based on device type
  switch (deviceType) {
    case 'ios':
      // iOS - direct download
      link.click();
      break;
    case 'android':
      // Android - attempt direct contact import using multiple approaches
      try {
        // Method 1: Using content intent scheme
        const vcfBlob = new Blob([vcfData], { type: 'text/vcard' });
        const vcfUrl = URL.createObjectURL(vcfBlob);
        
        // Method 2: Create an element to open the contacts app
        const importElement = document.createElement('a');
        importElement.setAttribute('href', vcfUrl);
        importElement.setAttribute('target', '_blank');
        importElement.style.display = 'none';
        document.body.appendChild(importElement);
        
        // Method 3: Try direct intent schema
        try {
          // Direct intent schema approach
          window.location.href = `intent://contacts/show_or_create_contact#Intent;scheme=content;type=text/vcard;package=com.android.contacts;end;S.contact=${encodeURIComponent(vcfUrl)}`;
          
          // Small delay to let the intent process
          setTimeout(() => {
            // Fallback to Method 2
            importElement.click();
            
            // Clean up the element
            setTimeout(() => {
              document.body.removeChild(importElement);
            }, 100);
          }, 500);
        } catch (intentError) {
          console.log('Intent method failed, using direct link', intentError);
          // Just use Method 2
          importElement.click();
          
          // Clean up the element
          setTimeout(() => {
            document.body.removeChild(importElement);
          }, 100);
        }
        
        // Alert user with instructions as a fallback
        setTimeout(() => {
          alert('If the contact app didn\'t open automatically, please check your downloads folder and tap on the New_Abra_Ka_Dabra_contact.vcf file to import the contact.');
          // Fall back to download method
          link.click();
        }, 2000);
      } catch (error) {
        console.error('Error with Android contact import:', error);
        // Fallback to direct download
        link.click();
        // Alert with instructions
        setTimeout(() => {
          alert('Please check your downloads folder and tap on the New_Abra_Ka_Dabra_contact.vcf file to import the contact.');
        }, 1000);
      }
      break;
    default:
      // Other devices - direct download
      link.click();
      break;
  }
  
  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 2000);
  
  return Promise.resolve();
}
