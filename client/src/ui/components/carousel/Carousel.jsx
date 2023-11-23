import styles from './styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
function Carousel() {
	return (
		<Swiper
			spaceBetween={50}
			slidesPerView={3}
		>
			<SwiperSlide>
				<img
					src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg'
					style={{ width: '30px', height: '30px' }}
				/>
			</SwiperSlide>
            <SwiperSlide>
				<img
					src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg'
					style={{ width: '30px', height: '30px' }}
				/>
			</SwiperSlide>
            
            
		</Swiper>
	);
}

export default Carousel;
