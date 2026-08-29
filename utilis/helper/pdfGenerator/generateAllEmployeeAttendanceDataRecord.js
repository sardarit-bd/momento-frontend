import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../public/images/brand/landscapecompanypaper.png";

const generateAllEmployeeAttendanceDataRecord = async (
  headers,
  data,
  monthyear,
) => {
  const doc = new jsPDF("landscape");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  autoTable(doc, {
    head: headers,
    body: data,
    startY: 70,
    margin: { top: 60, bottom: 25 },
    theme: "grid",
    headStyles: {
      fillColor: [93, 111, 191],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    willDrawPage: () => {
      doc.addImage(logo.src, "PNG", 0, 0, pageWidth, pageHeight);
    },

    didDrawPage: () => {
      const pageCount = doc.internal.getNumberOfPages();
      const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
      if (pageCurrent === 1) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        const reportTitle = "All Employee Attendance Report";
        const reportWidth = doc.getTextWidth(reportTitle);
        doc.text(reportTitle, (pageWidth - reportWidth) / 2, 40);
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(`Report of the Month: ${monthyear}`, 15, 62);
        const today = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Printing Date: ${today}`, pageWidth - 55, 62);
      }

      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `Page ${pageCurrent} of ${pageCount}`,
        pageWidth - 30,
        pageHeight - 4,
      );
    },
  });

  doc.save("All Employee Attendance.pdf");
};

export default generateAllEmployeeAttendanceDataRecord;
