// window.onload = function(){
//     document.getElementById("download")
//     .addEventListener("click",()=>{
//         const contractForm = this.document.getElementById("contractForm");
//         console.log(contractForm); //consoles the form 
//         console.log(window) //consoles the window 
//         var opt = {
//             margin: 1,
//             filename: 'contract_form.pdf',
//             image: {type: 'jpeg', quality: 0.98},
//             html2canvas: {scale: 2},
//             jsPDF: {unit:'in', format:'letter', orientation: 'portrait'}
//         };
//         html2pdf().from(contractForm).set(opt).save(); //saves the form as pdf
        
//     })
// }