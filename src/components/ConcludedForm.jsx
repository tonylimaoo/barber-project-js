import { useScreenshot, createFileName } from 'use-react-screenshot'
import './Styles/concluded-form.css'
import { createRef } from 'react';

export default function Concluido({ transactionId, hour, date }) {

    const ref = createRef(null);

    // Component that shows the Schedule Confirmation
    const [image, takeScreenshot] = useScreenshot({
        type: 'image/jpeg',
        quality: 1.0
    });

    const download = (image, {name = 'img', extension = 'jpg'} = {}) => {
        const a = document.createElement('a');
        a.href = image;
        a.download = createFileName();
        a.click();
    }

    const downloadScreenshot = () => {
        takeScreenshot(ref.current).then(download)
    }

    date = date.split('-')

    return (
        <>
            <div className="concluded-container" ref={ref}>
                <section className="sectionId">
                    <h3>
                        Agendamento realizado!
                    </h3>
                    <p> <span>Foi agendado na data:</span><span className="black">{date[2]}/{date[1]}/{date[0]}</span></p>
                    <p> <span>Horário:</span><span className="black">{hour[0]}</span></p>
                    <p className='show-id'> <span>Seu ID do atendimento é:</span><span className="black">{transactionId}</span></p>
                </section>

            </div>
            <button onClick={downloadScreenshot}>Tire um Print!</button>
        </>
    )
}