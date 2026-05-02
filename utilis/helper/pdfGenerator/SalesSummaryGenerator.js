import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../public/images/brand/companypaper.png";

const SalesSummaryGenerator = async (headers, data) => {


    /******** initialize the doc from jspdf  *********/
    const doc = new jsPDF();



    /*********** get the page width and height ************/
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();


    /************ Add Company Branding Praspect *************/
    doc.addImage(logo.src, "PNG", 0, 0, pageWidth, pageHeight); // x, y, width, height





    const companyName = "";
    const textWidth = doc.getTextWidth(companyName);
    const x = (pageWidth - textWidth) / 2; // center
    doc.text(companyName, x, 15);



    /********** Report Title ************/
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    const reportTitle = "Single Employee Attendance Report";
    const reportWidth = doc.getTextWidth(reportTitle);
    doc.text(reportTitle, (pageWidth - reportWidth) / 2, 30);




    /*********** Employee Information ***********/
    // doc.setFontSize(14);
    // doc.setFont("helvetica", "normal");
    // doc.setTextColor(0, 0, 0);
    // const Eid = `Employee ID: ${eid}`;
    // doc.text(Eid, 15, 50);
    // const Name = `Employee Name: ${name}`;
    // doc.text(Name, 15, 58);
    // const Position = `Employee Designation: ${position}`;
    // doc.text(Position, 15, 66);
    // const month = `Report of the Month: ${monthyear}`;
    // doc.text(month, 15, 74);
    // const shift = `Working Shift: ${shiftname}`;
    // doc.text(shift, 15, 82);




    /*************** printing date ***************/
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Printing Date: ${today}`, pageWidth - 57, 80);



    /************** make a table from the all data *****************/
    autoTable(doc, {
        head: headers,
        body: data,
        startY: 91, // leave space after header
        theme: "grid",
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 245, 245] },


        /******* page number added ******/
        didDrawPage: () => {
            const pageCount = doc.internal.getNumberOfPages();
            const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            doc.text(
                `Page ${pageCurrent} of ${pageCount}`,
                pageWidth - 33, // right side
                pageHeight - 7 // bottom
            );
        },
    });


    /**************** save the document as a pdf document *****************/
    doc.save("Sales Summary Report.pdf");
};




export default SalesSummaryGenerator;