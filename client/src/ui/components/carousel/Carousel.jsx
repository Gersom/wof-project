import styles from './styles.module.scss';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const Carousel = () => {
	const [activeSlide, setActiveSlide] = useState(0);
	return (
		<Swiper
			slidesPerView={3}
			centeredSlides={'auto'}
			spaceBetween={10}
			loopedSlides={3}
			loop={true}
			pagination={{
				clickable: true,
			}}
			modules={[Pagination]}
			className={styles.swiper}
			onPaginationUpdate={(swiper) => {
				setActiveSlide(swiper.activeIndex);
				console.log(swiper.activeIndex);
			}}
			initialSlide={1}
		>
			<SwiperSlide className={`${styles.swiperSlides}`}>
				primera
				<img
					src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg'
					className={styles.swiperSlidesImg}
				/>
			</SwiperSlide>
			<SwiperSlide className={styles.swiperSlides}>
				segunda
				<img
					src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg'
					className={styles.swiperSlidesImg}
				/>
			</SwiperSlide>
			<SwiperSlide className={styles.swiperSlides}>
				Tercera
				<img
					src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg'
					className={styles.swiperSlidesImg}
				/>
			</SwiperSlide>
		</Swiper>
	);
}

export default Carousel;
