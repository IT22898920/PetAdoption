import { jsPDF } from 'jspdf'
import { format } from 'date-fns'

export function generateDonationReceipt(donation) {
  const doc = new jsPDF()
  
  // Add logo placeholder
  doc.setFontSize(22)
  doc.setTextColor(22, 163, 74) // Primary color
  doc.text('Pet Adoption Center', 105, 20, { align: 'center' })
  
  // Receipt title
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text('Donation Receipt', 105, 40, { align: 'center' })
  
  // Receipt number and date
  doc.setFontSize(10)
  doc.text(`Receipt #: ${donation.id}`, 20, 60)
  doc.text(`Date: ${format(new Date(donation.date), 'MMMM d, yyyy')}`, 20, 70)
  
  // Donor information
  doc.setFontSize(12)
  doc.text('Donor Information:', 20, 90)
  doc.setFontSize(10)
  doc.text(`Name: ${donation.donor}`, 30, 100)
  doc.text(`Email: ${donation.email}`, 30, 110)
  
  // Donation details
  doc.setFontSize(12)
  doc.text('Donation Details:', 20, 130)
  doc.setFontSize(10)
  doc.text(`Amount: LKR ${donation.amount.toLocaleString()}`, 30, 140)
  doc.text(`Purpose: ${donation.purpose}`, 30, 150)
  if (donation.message) {
    doc.text('Message:', 30, 160)
    doc.setFontSize(9)
    const messageLines = doc.splitTextToSize(donation.message, 150)
    doc.text(messageLines, 30, 170)
  }
  
  // Thank you message
  doc.setFontSize(11)
  doc.text('Thank you for your generous donation!', 105, 200, { align: 'center' })
  doc.setFontSize(9)
  doc.text('Your contribution helps us continue our mission of caring for animals in need.', 105, 210, { align: 'center' })
  
  // Footer
  doc.setFontSize(8)
  doc.text('This receipt is computer generated and does not require a signature.', 105, 270, { align: 'center' })
  doc.text('Pet Adoption Center | 123 Pet Street | City, Country | contact@petadoption.com', 105, 280, { align: 'center' })
  
  // Save the PDF
  doc.save(`donation-receipt-${donation.id}.pdf`)
}