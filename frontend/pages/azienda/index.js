import DescrizioneAz3 from "../../components/Azienda/DescrizioneAzienda/DescrizioneAz3"
import DescrizioneAz2 from "../../components/Azienda/DescrizioneAzienda/DescrizioneAz2"
import DescrizioneAz1 from "../../components/Azienda/DescrizioneAzienda/DescrizioneAz1"

import testi from "../../config/testi.json"

const Azienda = () => {
    return (
        <DescrizioneAz3
            img="/Azienda/azienda_foto.jpg"
            titolo= {testi.TITOLO}
            descr={testi.DESCRIZIONE}/>
    );
}

export default Azienda;