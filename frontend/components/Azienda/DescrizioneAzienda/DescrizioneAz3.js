import Image from "next/image";
import styles from '../../../styles/DescrizioneAz.module.css'

const DescrizioneAz3 = (props) => {
    return (
        <div>
            <div className={styles.foto}>
            <Image src={props.img} alt="Foto dell'azienda" width={800} height={500}  />
            </div>
            <div className={styles.descrizione3}>
                <h2>{props.titolo}</h2>
                <p> {props.descr} </p>
            </div>
        </div>
    );
}

export default DescrizioneAz3;