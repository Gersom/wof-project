import styles from './styles.module.scss';
import starReview from '@icons/starReview.svg';

function CardUser({ 
  name, role, address, rating, imgSrc, cellPhone, success
}) {
	const rol = role === 'owner' ? 'Dueño' : 'Cuidador';

	return (
		<article className={styles.article}>
			<figure>
				<img src={imgSrc} alt={`${name} profile picture`} />
				<figcaption>
					<h3>{name}</h3>
					<h4>{rol}</h4>
				</figcaption>
			</figure>
			<footer>
				<h4>{address}</h4>
				<div>
					<h5>Puntuación :</h5>
					<img src={starReview} alt='starReview' />
					<h4>{rating}</h4>
				</div>
        {
          success ? <>
            <div className={styles.bar}></div><h5 style={{ color: "#1f1f1f" }}>Información de contacto :</h5><h3 style={{ color: "#1f1f1f" }}>
              <svg style={{ marginRight: "7px" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.40213 0.0212345C6.62064 0.245077 4.18328 1.53769 2.44683 3.70991C2.10585 4.13238 1.63858 4.87957 1.36707 5.42814C0.858757 6.45593 0.571452 7.42381 0.41675 8.59662C0.340977 9.17042 0.340977 10.3432 0.41675 10.8981C0.606181 12.2948 0.997673 13.4833 1.62911 14.5679L1.7554 14.7854L0.8777 17.3927L0 20L0.176803 19.9464C0.277833 19.9149 0.741941 19.7667 1.20921 19.6154C1.67963 19.464 2.11848 19.3222 2.18794 19.3001C3.38451 18.9186 4.61266 18.5245 4.94732 18.4173L5.36723 18.2786L5.84712 18.5119C6.84795 18.9974 7.84247 19.2875 8.9759 19.4294C9.61366 19.5082 10.7092 19.5019 11.3596 19.4136C13.5349 19.1204 15.4513 18.1809 16.992 16.6487C18.8516 14.798 19.8588 12.3736 19.8619 9.74736C19.8619 7.2977 18.9558 4.97415 17.292 3.14873C15.8996 1.62912 13.9232 0.528822 11.9279 0.16626C11.1481 0.0243874 10.0967 -0.0355148 9.40213 0.0212345ZM11.2649 1.67641C12.231 1.8372 12.9098 2.04843 13.6801 2.43306C14.561 2.86814 15.2114 3.33159 15.8744 3.99366C17.1657 5.28627 17.955 6.89731 18.2139 8.78579C18.2675 9.17042 18.2675 10.3212 18.217 10.6932C18.0592 11.8092 17.816 12.5911 17.3393 13.5149C16.2406 15.6366 14.2074 17.1972 11.8774 17.7048C11.1007 17.8719 11.0155 17.8814 10.1125 17.8814C9.26952 17.8814 9.16534 17.8719 8.54968 17.7521C7.59621 17.5629 6.54802 17.1562 5.8345 16.696L5.63559 16.5667L4.5432 16.9166C3.05301 17.3927 2.51628 17.5566 2.5005 17.5409C2.49418 17.5346 2.71519 16.8504 2.99302 16.0213L3.49817 14.5174L3.33084 14.2747C2.58574 13.1996 2.10901 11.8471 1.97956 10.4252C1.93536 9.95229 1.96062 9.06953 2.03008 8.59662C2.28897 6.85002 3.08774 5.2579 4.31904 4.02203C5.72084 2.61907 7.42256 1.81828 9.44948 1.61651C9.7431 1.58813 10.9776 1.62597 11.2649 1.67641Z" fill="#189D0E" />
                <path d="M6.48178 5.0751C6.0082 5.30525 5.5283 5.97678 5.33887 6.66722C5.26626 6.9289 5.25363 7.03294 5.25678 7.39865C5.25678 7.86841 5.33256 8.23412 5.52199 8.71649C5.75878 9.3155 6.44073 10.4063 7.06901 11.1977C7.73834 12.0426 8.74548 12.9569 9.50637 13.4172C10.1978 13.8333 11.6848 14.4324 12.3699 14.5711C12.6415 14.6247 12.7236 14.6247 13.2192 14.5553C13.7686 14.4797 14.4853 14.0856 14.8073 13.6789C14.9462 13.5055 15.0378 13.2659 15.1199 12.8718C15.2019 12.4682 15.1988 12.3705 15.0946 12.257C14.9336 12.0867 13.0109 11.0873 12.7962 11.0621C12.6257 11.0432 12.5973 11.0653 12.3005 11.4184C11.8932 11.907 11.6122 12.2034 11.4954 12.2664C11.3596 12.339 11.2586 12.3137 10.8482 12.1088C9.52847 11.4467 8.575 10.5325 7.84568 9.22407C7.65941 8.88989 7.66572 8.85836 8.07616 8.40437C8.43292 8.00397 8.61288 7.72338 8.61288 7.56574C8.61288 7.51845 8.57184 7.37028 8.52132 7.24101C8.47081 7.11175 8.30032 6.65461 8.14562 6.22584C7.98776 5.79707 7.82674 5.38407 7.78885 5.30209C7.67835 5.06564 7.62152 5.04357 7.09743 5.01835C6.65542 4.99943 6.63332 5.00259 6.48178 5.0751Z" fill="#189D0E" />
              </svg>
              {cellPhone}
            </h3>
          </>
          : ''
        }
        
			</footer>
		</article>
	);
}

export default CardUser;