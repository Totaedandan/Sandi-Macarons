import React, { useEffect } from 'react';
import styles from "./About.module.scss";
import certificateImage from "../../assets/halal.png"; // Ensure the path to your image is correct

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className={styles.about}>
      <h2>Узнайте про Sandi Macarons</h2>
      <p>Sandi Macarons это премиуим десерты ”BIG macarons”.
        Основание <a href="https://kristinedejesus.vercel.app" target="_blank" rel="noopener noreferrer">7 июля 2023 года.</a>
        <br></br>
        Опыт в производстве десертов более 5 лет, с 2019 года.
        Идея начать делать свои Макаронсы пришла к Санди в 2022 году, когда этот десерт начал набирать популярность, с этого момента Санди начала набирать опыт в производстве Макаронс от лучших местных и зарубежных  шеф-кондитеров.
        <br></br>
        Набравшись опыта Санди откорректировала оригинальный десерт макаронс который полюбили наши клиенты.
        Макаронс это модный десерт из двух округлых половинок печенья склеенных сладкой начинкой. 
        <br></br> Десерт с <a href="https://kristinedejesus.vercel.app" target="_blank" rel="noopener noreferrer">приятным нежным, умеренно сладким вкусом и тонким ароматом, фруктово-ягодные пюре в начинке добавляют ко вкусу мягкую кислинку.</a>
        <br></br>
        Готовые Макаронсы хранятся в холодильнике до 5 суток, а в морозильнике 3-4 недели. 
      </p>
      <h3>Наши Сертификаты</h3>
      <div className={styles.certificateContainer}>
        <img src={certificateImage} alt="Certificate" className={styles.certificateImage} />
      </div>
    </div>
  );
}
