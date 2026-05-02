'use client'

import useProductUploadStore from "@/store/useProductUploadStore";
import { TiTick } from "react-icons/ti";
import styles from "../../styles/Progressbar.module.css";


export default function Prograssber() {

    const { rander, setrander } = useProductUploadStore();

    function handleClik(stage) {
        setrander(stage)
    }

    return (

        <div className={styles.prograssberWrp}>
            <div style={{ cursor: "pointer" }} onClick={() => handleClik(1)} className={rander > 1 || rander === 1 ? styles.active : styles.alldiv}>{rander > 1 ? <TiTick className={styles.icons} /> : 1}</div>
            <div style={{ cursor: "pointer" }} onClick={() => handleClik(2)} className={rander > 2 || rander === 2 ? styles.active : styles.alldiv}>{rander > 2 ? <TiTick className={styles.icons} /> : 2}</div>
            <div className={rander > 3 || rander === 3 ? styles.active : styles.alldiv}>{rander > 3 ? <TiTick className={styles.icons} /> : 3}</div>
        </div>

    )
}