require("dotenv").config();

const { MAIL_PASSWORD } = process.env;

const nodeMailer = require("nodemailer");

const createUserMail = async (email, name, lastName) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "wofbot.noreplay@gmail.com",
      pass: `${MAIL_PASSWORD}`,
    },
  });
  let info = await transporter.sendMail({
    from: '"soporte" <wofbot.noreplay@gmail.com>',
    to: email,
    subject: "Usuario Creado",
    html: `
    <!DOCTYPE html>
    <html
  lang="es"
  xmlns="https://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="background-color: #52c1e4;"
>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <title>Gracias por Registrarte</title>
    <style>
      table,
      td,
      div,
      h1,
      p {
        font-family: Arial, sans-serif;
      }
      table,
      td {
        background-color: #393e46;
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0">
    <table
      style="
        width: 640px;
        margin: 16px auto 0 auto;
        border-collapse: collapse;
        background-color: #6c6cf4;
        border: 0;
        border-spacing: 0;
        background: black;
      "
    >
      <tr>
        <td align="center" style=" max-width: 135px">
          <img
            style="width: 100%"
            src=""
            alt="img"
          />
        </td>
      </tr>
      <tr>
        <td
          align="center"
          style="padding: 15px; font-size: 45px; color: #cbcbd0"
        >
          Tu cuenta se ha creado con &eacute;xito! Muchas gracias y esperemos que tengas una experiencia wofcional!
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 30px 64px; color: #e2e4eb">
          <br />
          Nombre: ${name} ${lastName}<br />
          Email: ${email}
        </td>
        
      </tr>
      <tr>
        <td align="center" style="padding-bottom: 48px">
          <svg width="139" height="58" viewBox="0 0 139 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_168_40)">
            <path d="M7.29922 0.244995C5.13554 1.01352 4.01535 2.65817 4 5.0406C4 6.00895 4.12276 6.6084 4.79795 8.80639C6.5473 14.432 8.03579 19.535 9.93859 26.4057C15.4782 46.372 15.3094 45.8033 15.6317 46.4796C15.7851 46.787 16.2608 47.4325 16.7058 47.9244C18.8388 50.2146 22.3068 50.3837 24.7007 48.3087C25.8055 47.3557 26.0971 46.7409 29.2122 38.3947C29.4423 37.7645 29.8873 36.5963 30.1942 35.8124C30.4858 35.0285 30.762 34.26 30.7774 34.1217C30.8081 33.9833 30.9155 33.6913 31.0075 33.4761C31.115 33.2609 31.4679 32.3694 31.7901 31.4779C32.1124 30.5864 32.4346 29.864 32.496 29.864C32.5574 29.864 32.6802 30.1099 32.7876 30.402C32.895 30.694 33.3247 31.8776 33.7697 33.015C34.1993 34.1524 34.9052 36.0583 35.3502 37.2419C36.1789 39.4706 36.3477 39.9471 37.5599 43.1595C38.6955 46.1722 39.0945 46.9253 39.9538 47.8476C42.1175 50.1378 45.4627 50.3837 47.8259 48.447C48.2862 48.0627 48.8693 47.4172 49.1149 47.0175C49.4985 46.4027 50.3271 44.4353 50.4346 43.882C50.4652 43.7897 50.5266 43.5899 50.588 43.4669C50.634 43.344 51.0484 42.1912 51.5087 40.9308C51.9691 39.6551 52.8591 37.1804 53.5036 35.4282C54.1481 33.6759 54.6698 32.1696 54.6698 32.1081C54.6698 32.0313 54.2248 31.9237 53.6724 31.8622C52.5368 31.7392 51.6468 31.3089 50.2351 30.2175C49.0535 29.2799 48.1021 28.0657 47.2121 26.3442C46.8284 25.6064 46.4448 25.053 46.3834 25.1145C46.3067 25.1914 45.5088 27.5584 44.6034 30.3559C43.698 33.1687 42.9001 35.4743 42.854 35.4743C42.7927 35.4743 42.4551 34.552 42.1021 33.43C41.7338 32.3233 40.6904 29.1109 39.785 26.3288C38.8643 23.5314 37.8668 20.4265 37.5599 19.4121C36.716 16.6607 36.1328 15.8307 34.5676 15.139C33.3093 14.5857 30.9155 14.7855 30.1329 15.5079C29.9641 15.6616 29.7646 15.8 29.6879 15.8C29.3196 15.8 28.4449 17.0604 28.0766 18.1209C27.4014 19.9808 24.0408 29.8025 23.0894 32.6615C22.6137 34.1217 22.1841 35.3206 22.1227 35.3206C22.0766 35.3206 21.7084 33.845 21.294 32.062C20.4654 28.3423 18.7621 21.5178 16.4143 12.4185C15.5396 8.99083 14.6803 5.64005 14.5268 4.97912C14.2046 3.61115 13.3913 1.87427 13.0997 1.93576C12.9923 1.95113 12.9462 1.92038 12.9923 1.84353C13.0383 1.76668 12.8542 1.50538 12.5933 1.25945C12.3324 1.01352 12.1636 0.921299 12.225 1.04426C12.2864 1.16723 12.2097 1.12112 12.0562 0.952042C11.5345 0.337219 10.7826 0.0759201 9.40151 0.0144386C8.41942 -0.0316734 7.89768 0.029808 7.29922 0.244995Z" fill="#52C1E4"/>
            <path d="M103.007 0.905884C101.427 1.33626 100.214 2.42757 99.5852 3.96462L99.2476 4.81V25.4065V46.003L99.8 46.9868C100.306 47.9244 101.488 49.1386 101.948 49.2155C102.071 49.2309 102.332 49.3385 102.531 49.446C103.529 49.9994 105.708 49.7381 106.982 48.9388C107.856 48.3701 108.961 47.0021 108.762 46.7101C108.716 46.6332 108.777 46.541 108.869 46.5103C109.022 46.4488 109.084 44.5736 109.145 37.9181L109.222 29.4029H114.209C118.751 29.4029 119.273 29.3721 120.01 29.1108C120.47 28.9417 121.038 28.619 121.283 28.3884C121.529 28.1579 121.728 28.0041 121.728 28.0503C121.728 28.081 121.897 27.9119 122.112 27.666C123.247 26.3134 123.539 24.1308 122.772 22.563C122.235 21.4563 121.652 20.8261 120.715 20.3035L119.964 19.8731L114.593 19.7963L109.222 19.7194L109.176 15.0775L109.13 10.4356L119.841 10.3895C130.444 10.3434 130.552 10.3434 131.273 10.0052C133.437 9.00616 134.588 6.60836 133.958 4.41037C133.667 3.42665 132.838 2.05867 132.623 2.19701C132.531 2.25849 132.485 2.21238 132.501 2.10479C132.547 1.90497 131.104 1.01348 130.92 1.13644C130.859 1.16718 130.782 1.1057 130.751 1.01348C130.69 0.859776 127.851 0.813663 117.109 0.782921C108.854 0.767551 103.329 0.813663 103.007 0.905884Z" fill="#52C1E4"/>
            <path d="M67.5597 4.10296C65.0124 4.64093 62.8948 7.56133 62.5725 10.9736C62.4498 12.1571 62.68 14.4781 63.0329 15.8768C63.6774 18.4129 65.5802 20.903 67.2528 21.3948C67.6978 21.5332 68.327 21.6407 68.6339 21.6407C71.1965 21.6407 73.6671 18.5513 74.373 14.4934C74.6799 12.7719 74.6799 11.7729 74.3883 10.1128C73.9433 7.62282 72.4548 5.33261 70.7208 4.51797C69.8615 4.10296 68.4037 3.91851 67.5597 4.10296Z" fill="#52C1E4"/>
            <path d="M83.8871 9.02155C81.662 9.59027 79.6365 11.7729 78.6851 14.6164C78.102 16.384 77.8871 18.8741 78.194 20.5802C78.7771 23.931 80.4651 25.6525 82.9664 25.4527C84.24 25.3451 85.3449 24.7764 86.4804 23.6697C88.7669 21.4256 90.1326 18.2131 90.1326 15.0622C90.1326 12.2647 89.1505 10.2666 87.3091 9.31359C86.6032 8.96007 84.7618 8.791 83.8871 9.02155Z" fill="#52C1E4"/>
            <path d="M51.1865 12.5106C49.8054 13.0179 48.6085 14.5549 47.9793 16.6453C47.565 17.9826 47.611 20.6878 48.056 22.4093C48.5931 24.515 49.4678 26.1443 50.7414 27.4201C51.5701 28.2501 52.0458 28.5882 52.721 28.8342C55.2069 29.7718 57.3552 28.7419 58.5828 26.0367C59.3348 24.4074 59.5036 23.5006 59.5036 21.1796C59.5036 18.7665 59.3348 17.9211 58.4754 16.1381C57.7849 14.6625 56.5573 13.3407 55.3604 12.7258C54.3936 12.2493 52.2146 12.1264 51.1865 12.5106Z" fill="#52C1E4"/>
            <path d="M93.3551 23.8849C91.9433 24.3921 90.7924 25.3451 89.8257 26.8053C88.8129 28.3116 88.506 29.2492 88.506 30.8631C88.506 31.9698 88.5674 32.2772 88.8896 32.8612C89.3193 33.6144 90.0252 34.1677 90.8845 34.3983C92.1274 34.7365 94.4906 33.5068 95.8563 31.8314C97.0839 30.2944 97.9279 27.8966 97.7284 26.421C97.4522 24.3613 95.3653 23.1471 93.3551 23.8849Z" fill="#52C1E4"/>
            <path d="M69.4319 24.3306C68.9869 24.4382 68.1122 24.7763 67.4677 25.0838C66.1327 25.7139 64.6442 27.128 62.5726 29.6949C61.2222 31.3703 59.7338 32.7229 57.7849 34.0448C57.079 34.5213 56.1737 35.2591 55.7901 35.6894C54.9614 36.6117 54.1328 38.2717 53.9026 39.4552C53.2274 43.0519 55.0535 47.0175 58.1225 48.6468C60.7619 50.0455 62.6187 50.1531 67.4064 49.2309C71.3654 48.4623 72.7925 48.447 75.6928 49.154C76.8283 49.4153 78.3321 49.7074 79.038 49.7688C84.7464 50.3683 89.5034 46.541 89.5034 41.3765C89.5034 38.118 88.2144 35.8431 85.1608 33.7681C82.9971 32.2925 82.2759 31.6316 79.9741 28.9264C77.304 25.8062 76.1378 24.9301 73.8974 24.346C72.7925 24.0539 70.5982 24.0539 69.4319 24.3306Z" fill="#52C1E4"/>
            </g>
            <defs>
            <filter id="filter0_d_168_40" x="0" y="3.05176e-05" width="138.13" height="57.8307" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_168_40"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_168_40" result="shape"/>
            </filter>
            </defs>
            </svg>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 30px 64px; color: rgb(248, 248, 248)">
          <span>
            *Si no reconoces esta acci&oacute;n, por favor hacer caso omiso de
            la misma. <br />
            Por favor, no respondas este mensaje.
          </span>
        </td>
      </tr>
      <tr>
        <td
          align="center"
          sytle
          style="
            padding: 16px;
            background-image: url(https://uploads-ssl.webflow.com/6220198191ae7de1cf227e8d/627ede6f6c1b68ac25fe6871_MAIL_FOOTER.png);
            background-size: 94% 88%;
            background-repeat: no-repeat;
            background-position: center;
          "
        >
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            sytle
            style="background: transparent; padding-top: 16px"
          >
            <tr style="color: white">
              <td style="background: transparent; padding: 0 16px">
                Copyright 2023 WOF
              </td>
            </tr>
          </table>
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            sytle
            style="background: transparent; padding-top: 16px"                 
            
          > 
          <tr>
            <td colspan="2" style="text-align: center; background: transparent; padding: 0 16px; color: white; font-size: 16px; line-height: 1.5;">
              © Todos los derechos reservados.
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center; background: transparent; padding: 0 16px; color: white; font-size: 16px; line-height: 1.5;">
              Haz click en el logo para volver a la página.
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center; background: transparent; padding: 0 16px;">
              <a href="https://wof-project.vercel.app/">
                <svg height="64px" width="64px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#fbf4f4" stroke="#fbf4f4">
            </tr>
          </table>
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            sytle
            style="background: transparent; padding-top: 20px; "
          >

                <a href="https://wof-project.vercel.app/">
                  <svg height="64px" width="64px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#0e0c0c" stroke="#0e0c0c" stroke-width="0.00512"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#fbf4f4;} </style> <g> <path class="st0" d="M181.374,369.211c19.336,18.703,45.727,30.187,74.563,30.187c1.133,0,2.281-0.015,3.422-0.054 c29.023-0.906,55.07-13.305,73.774-32.656c18.703-19.321,30.187-45.719,30.187-74.555c0-1.133-0.015-2.274-0.062-3.414l-9,0.281 l9-0.289c-0.906-29.023-13.297-55.062-32.641-73.766c-19.336-18.703-45.726-30.188-74.57-30.18c-1.141,0-2.281,0.016-3.422,0.047 c-29.016,0.906-55.062,13.305-73.766,32.656c-18.703,19.321-30.187,45.719-30.187,74.562c0,1.133,0.023,2.282,0.062,3.414 C149.64,324.469,162.031,350.508,181.374,369.211z M320.164,354.164c-8.226,8.508-18.133,15.367-29.195,20.078 c4.594-6.618,8.515-14.43,11.758-23.18h20.312C322.102,352.118,321.148,353.156,320.164,354.164z M331.586,339.594h-25.203 c3.477-12.656,5.594-26.781,6.023-41.781h32.68C344.133,313.078,339.32,327.321,331.586,339.594z M331.602,244.562 c7.703,12.219,12.5,26.438,13.484,41.782h-32.711c-0.437-14.977-2.5-29.125-5.969-41.782H331.602z M318.086,227.906 c1.719,1.656,3.344,3.406,4.922,5.187h-20.304c-1.719-4.648-3.594-9.078-5.703-13.156c-1.844-3.57-3.836-6.914-5.969-10 C301.109,214.25,310.281,220.359,318.086,227.906z M261.734,202.992c2.484,0.149,4.945,0.398,7.374,0.75 c1.008,0.664,2.016,1.375,3.031,2.195c6.86,5.594,13.321,15.023,18.313,27.156h-28.718V202.992z M261.734,244.562H294.5 c3.679,12.336,5.976,26.562,6.445,41.782h-39.21V244.562z M261.734,297.813h39.171c-0.468,15.234-2.781,29.453-6.461,41.781h-32.71 V297.813z M261.734,351.062h28.687c-1.141,2.766-2.328,5.43-3.602,7.898c-4.32,8.375-9.398,14.946-14.68,19.258 c-0.992,0.812-1.984,1.507-2.976,2.164c-2.446,0.359-4.93,0.617-7.43,0.781V351.062z M180.39,339.594 c-7.695-12.203-12.5-26.43-13.477-41.781h32.711c0.438,14.977,2.5,29.125,5.969,41.781H180.39z M193.906,356.25 c-1.718-1.657-3.343-3.398-4.922-5.188h20.305c1.726,4.657,3.602,9.086,5.695,13.164c1.859,3.57,3.844,6.914,5.985,9.993 C210.874,369.906,201.718,363.797,193.906,356.25z M250.266,381.172c-2.485-0.156-4.954-0.398-7.375-0.758 c-1.016-0.657-2.016-1.375-3.031-2.195c-6.867-5.578-13.321-15.016-18.313-27.157h28.719V381.172z M250.266,339.594H217.5 c-3.688-12.328-5.985-26.562-6.446-41.781h39.211V339.594z M250.266,286.344h-39.172c0.469-15.226,2.766-29.438,6.453-41.782 h32.719V286.344z M225.179,225.203c4.321-8.375,9.391-14.946,14.68-19.266c0.992-0.805,1.984-1.508,2.984-2.156 c2.438-0.367,4.922-0.626,7.422-0.782v30.094h-28.688C222.71,230.344,223.906,227.664,225.179,225.203z M191.828,229.992 c8.226-8.5,18.141-15.367,29.203-20.078c-4.594,6.617-8.531,14.43-11.766,23.179h-20.305 C189.89,232.039,190.843,231,191.828,229.992z M180.406,244.562h25.203c-3.469,12.672-5.594,26.797-6.023,41.782h-32.68 C167.859,271.086,172.672,256.844,180.406,244.562z"></path> <path class="st0" d="M464,0H48C21.492,0,0,21.492,0,48v416c0,26.508,21.492,48,48,48h416c26.507,0,48-21.492,48-48V48 C512,21.492,490.507,0,464,0z M444.664,35c10.492,0,19,8.508,19,19s-8.508,19-19,19s-19-8.508-19-19S434.172,35,444.664,35z M374.164,35c10.492,0,19,8.508,19,19s-8.508,19-19,19s-19-8.508-19-19S363.672,35,374.164,35z M303.664,35 c10.492,0,19,8.508,19,19s-8.508,19-19,19s-19-8.508-19-19S293.172,35,303.664,35z M472,464c0,4.406-3.586,8-8,8H48 c-4.414,0-8-3.594-8-8V104h432V464z"></path> </g> </g></svg>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `,
  });
};

module.exports = createUserMail;
