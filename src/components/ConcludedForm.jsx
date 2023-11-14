// import { useScreenshot, createFileName } from 'use-react-screenshot'
import './Styles/concluded-form.css'
// import html2canvas from 'html2canvas';

export default function Concluido({ transactionId, hour, date }) {

    // Component that shows the Schedule Confirmation
    // const [image, takeScreenshot] = useScreenshot({
    //     type: 'image/jpeg',
    //     quality: 1.0
    // });

    // const takeScreenshot = (elementId, fileName, fileType) => {
    //     console.log("entrou")

    //     const element = document.getElementById(elementId);
    //     console.log(element)
    //     if (!element) {
    //         return;
    //     }

    //     html2canvas(element).then((canvas) => {
    //         let image = canvas.toDataUrl(fileType);
    //         console.log("the image is ", image);
    //         const a = document.createElement("a");
    //         a.href = image;
    //         a.download = fileName;
    //         a.click();
    //     }).catch(err => {
    //         console.error("We cannot take this screenshot at the moment: ", err)
    //     });
    // }

    // const download = (image, {name = 'img', extension = 'jpg'} = {}) => {
    //     const a = document.createElement('a');
    //     a.href = image;
    //     a.download = 
    //     a.click();
    // }

    // const downloadScreenshot = () => {
    //     takeScreenshot(ref.current).then(download)
    // }

    date = date.split('-')

    return (
        <>
            <div className="concluded-container" id='appointmentConfirmation'>
                <section className="sectionId">
                    <h3>
                        Agendamento realizado!
                    </h3>
                    <p> <span>Foi agendado na data:</span><span className="black">{date[2]}/{date[1]}/{date[0]}</span></p>
                    <p> <span>Horário:</span><span className="black">{hour[0]}</span></p>
                    <p className='show-id'> <span>Seu ID do atendimento é:</span><span className="black">{transactionId}</span></p>
                </section>

            </div>
            <button onClick={() => console.log("banana")}>Tire um Print!</button>
        </>
    )
}