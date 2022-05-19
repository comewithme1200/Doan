import React from 'react';
import styles from './InvoiceCard.module.css';
import {QRCodeSVG} from 'qrcode.react';
import {
    exportComponentAsJPEG
  } from "react-component-export-image";

  import { DownloadOutlined } from '@ant-design/icons';

const InvoiceCard = (props) => {

    const componentRef = React.createRef();
    
    const download = () => {
        exportComponentAsJPEG(componentRef)
    }

    return (
        <div className={styles.invoiceCard_container} ref={componentRef}>
            <div className={styles.left}>
                <table>
                    <tbody>
                        <tr className={styles.film_name}>
                            <td>PHIM:</td>
                            <td>{props.ticketInfo.movie_name}</td>
                        </tr>
                        <tr className={styles.cinema}>
                            <td>RẠP:</td>
                            <td>{props.ticketInfo.cinema}</td>
                        </tr>
                        <tr>
                            <td>SUẤT:</td>
                            <td>{props.ticketInfo.date + " " + props.ticketInfo.time + " / " + props.ticketInfo.room_name}</td>
                        </tr>
                        <tr>
                            <td>GHẾ:</td>
                            <td>{props.ticketInfo.seat}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.download_container}>
                    <div className={styles.download_text}>Tải xuống </div>
                    <button className={styles.button} onClick={() => download()}><DownloadOutlined /></button>
                </div>
                <QRCodeSVG value={props.ticketInfo.invoice_id} />
                <div className={styles.QRcode_note}>Mã quét</div>
            </div>
        </div>
    );
};

export default InvoiceCard;