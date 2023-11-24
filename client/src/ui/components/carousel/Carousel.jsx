import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.scss';

const Carousel = ({images}) => {

  return (
    <div className={`${styles.carouselComponent}`}>
		<h3>Fotos:</h3>
      <Swiper
      className={`${styles.swiper}`}
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={3}
      pagination={{ clickable: true }}
      >
		
        {
          images.map((ele, indx) => (
            <SwiperSlide key={'swiper' + indx}
            className={`${styles.swiperSlide}`}>
              <figure className={`${styles.sliderFigure}`}>
                <img src={ele} alt={'pet 0' + indx} 
                className={`${styles.sliderImg}`}/>
              </figure>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )

	// const [activeSlide, setActiveSlide] = useState(0);
	// return (
	// 	<Swiper
	// 		slidesPerView={3}
	// 		centeredSlides={'auto'}
	// 		spaceBetween={10}
	// 		loopedSlides={3}
	// 		loop={true}
	// 		pagination={{
	// 			clickable: true,
	// 		}}
	// 		modules={[Pagination]}
	// 		className={styles.swiper}
	// 		onPaginationUpdate={(swiper) => {
	// 			setActiveSlide(swiper.activeIndex);
	// 			console.log(swiper.activeIndex);
	// 		}}
	// 		initialSlide={1}
	// 	>
	// 		<SwiperSlide className={`${styles.swiperSlides}`}>
	// 			primera
	// 			<img
	// 				src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg'
	// 				className={styles.swiperSlidesImg}
	// 			/>
	// 		</SwiperSlide>
	// 		<SwiperSlide className={styles.swiperSlides}>
	// 			segunda
	// 			<img
	// 				src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg'
	// 				className={styles.swiperSlidesImg}
	// 			/>
	// 		</SwiperSlide>
	// 		<SwiperSlide className={styles.swiperSlides}>
	// 			Tercera
	// 			<img
	// 				src='https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg'
	// 				className={styles.swiperSlidesImg}
	// 			/>
	// 		</SwiperSlide>
	// 	</Swiper>
	// );
}

export default Carousel;
