import React from 'react';
import {SocialIcon} from 'react-social-icons';
import styles from './Footer.module.css' 

const Footer = () => (
  <footer className={styles.footer}>
  	 <div className={styles.container}>
  	 	<div className={styles.row}>
  	 		<div className={styles.footer_col}>
  	 			<h4>Về chúng tôi</h4>
  	 			<ul style={{paddingLeft : 0}}>
  	 				<li><a href='#'>về chúng tôi</a></li>
  	 				<li><a href='#'>Dịch vụ</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className={styles.footer_col}>
  	 			<h4>Trợ giúp</h4>
  	 			<ul style={{paddingLeft : 0}}>
  	 				<li><a href='#'>FAQ</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className={styles.footer_col}>
  	 			<h4>Kết nối với chúng tôi</h4>
  	 			<div className={styles.social_links}>
            <SocialIcon url="https://www.facebook.com/vu.long.7169/" network={styles.facebook} style={{ height: 40, width: 40 }}/>
            <SocialIcon url="https://www.linkedin.com/in/vũ-long-nguyễn-bb8a27221/"   style={{ height: 40, width: 40 }}/>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
);

export default Footer;