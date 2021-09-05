import Image from 'next/image'
import styles from '../../../styles/DescrizioneAz.module.css'
import { Container, Row, Col } from 'react-bootstrap';


const DescrizioneAz2 = (props) => {
    return (
        <Container className={styles.container}>
            <Row className={styles.row}>
                <Col className={styles.descrizione}>
                    <h2>{props.titolo}</h2>
                    <p> {props.descr} </p>
                </Col>
                <Col className={styles.foto}>
                    <Image src={props.img} alt="Foto dell'azienda" width={500} height={500} />
                </Col>
            </Row>
        </Container>

    );
}

export default DescrizioneAz2;