import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../public/images/brand/companypaper.png";

const generateSingleEmployeeAttendanceRecoard = async (headers, data, eid, name, position, monthyear, shiftname) => {


    /******** initialize the doc from jspdf  *********/
    const doc = new jsPDF();



    /*********** get the page width and height ************/
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();


    /************** make a table from the all data *****************/
    autoTable(doc, {
        head: headers,
        body: data,
        startY: 98, // leave space after header
        margin: { top: 50, bottom: 25, },
        theme: "grid",
        headStyles: { fillColor: [93, 111, 191], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 245, 245] },



        /********** Background image before table content **********/
        willDrawPage: () => {
            doc.addImage(logo.src, "PNG", 0, 0, pageWidth, pageHeight);
        },



        /******* For Every Page ******/
        didDrawPage: () => {


            /*********** get the page count and current page ************/
            const pageCount = doc.internal.getNumberOfPages();
            const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;



            if (pageCurrent == 1) {
                /********** Report Title ************/
                doc.setFontSize(16);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(0, 0, 0);
                const reportTitle = "Employee Attendance Report";
                const reportWidth = doc.getTextWidth(reportTitle);
                doc.text(reportTitle, (pageWidth - reportWidth) / 2, 88);

                /*********** Employee Information ***********/
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




                /*************** printing date ***************/
                const today = new Date().toLocaleDateString();
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                doc.text(`Date: ${today}`, 15, 70);

            }


            /******* page number added in every page *******/
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
    doc.save("Single Employee Mohthly Attendance Report.pdf");
};




export default generateSingleEmployeeAttendanceRecoard;

