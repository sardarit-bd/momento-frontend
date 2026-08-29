import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../public/images/brand/companypaper.png";

const SalesSummaryGenerator = async (headers, data) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.addImage(logo.src, "PNG", 0, 0, pageWidth, pageHeight);

  const companyName = "";
  const textWidth = doc.getTextWidth(companyName);
  const x = (pageWidth - textWidth) / 2;
  doc.text(companyName, x, 15);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  const reportTitle = "Single Employee Attendance Report";
  const reportWidth = doc.getTextWidth(reportTitle);
  doc.text(reportTitle, (pageWidth - reportWidth) / 2, 30);
  const today = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Printing Date: ${today}`, pageWidth - 57, 80);
  autoTable(doc, {
    head: headers,
    body: data,
    startY: 91,
    theme: "grid",
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    didDrawPage: () => {
      const pageCount = doc.internal.getNumberOfPages();
      const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `Page ${pageCurrent} of ${pageCount}`,
        pageWidth - 33,
        pageHeight - 7,
      );
    },
  });
  doc.save("Sales Summary Report.pdf");
};
export default SalesSummaryGenerator;
