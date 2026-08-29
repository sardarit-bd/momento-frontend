import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../public/images/brand/companypaper.png";

const generateSingleEmployeeAttendanceRecoard = async (
  headers,
  data,
  eid,
  name,
  position,
  monthyear,
  shiftname,
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  autoTable(doc, {
    head: headers,
    body: data,
    startY: 98,
    margin: { top: 50, bottom: 25 },
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
      if (pageCurrent == 1) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        const reportTitle = "Employee Attendance Report";
        const reportWidth = doc.getTextWidth(reportTitle);
        doc.text(reportTitle, (pageWidth - reportWidth) / 2, 88);
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        const Eid = `ID: ${eid}`;
        doc.text(Eid, 15, 46);
        const Name = `Name: ${name}`;
        doc.text(Name, 15, 54);
        const Position = `Designation: ${position}`;
        doc.text(Position, 15, 62);
        const month = `Month: ${monthyear}`;
        doc.text(month, pageWidth - 50, 46);
        const shift = `Shift: ${shiftname}`;
        doc.text(shift, pageWidth - 50, 54);
        const today = new Date().toLocaleDateString();
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${today}`, 15, 70);
      }

      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `Page ${pageCurrent} of ${pageCount}`,
        pageWidth - 33,
        pageHeight - 7,
      );
    },
  });
  doc.save("Single Employee Mohthly Attendance Report.pdf");
};
export default generateSingleEmployeeAttendanceRecoard;
