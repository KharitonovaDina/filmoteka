window.addEventListener('load', load);

// class Movie {
//   constructor(obj) {
//     this.type = obj.type
//     this.title = obj.title
//     this.poster = obj.img
//     this.movURL = obj.URL
//     this.description = obj.description
//   }
// }
//
// class Serial extends Movie {
//   constructor(obj) {
//     super(obj);
//     this.seasons = obj.seasons
//   }
// }
//
// class Film extends Movie {
//   constructor(obj) {
//     super(obj);
//   }
// }

function load() {
  // //Узлы
  // const addButton = document.querySelector('.form__button')
  // const addForm = document.querySelector('.form')
  // const btn = document.querySelector('.btn-slider')
  // const formToggle = document.querySelector('.form__toggle')
  // const cardContainer = document.querySelector('.movie-list')
  //
  // const movieTitle = document.querySelector('.form__content-ttl')
  // const moviePoster = document.querySelector('.form__content-img')
  // const movieURL = document.querySelector('.form__content-link')
  // const movieDescription = document.querySelector('.form__content-description')
  // const movieSeasons = document.querySelector('.form__content-seasons')
  //
  // //Переменные и константы
  // const arr = []
  // let type = 'serial'
  //
  // //Функции
  // function getPoster() {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(moviePoster.files[0])
  //     reader.onload = () => {
  //       resolve(reader.result)
  //     }
  //     reader.onerror = () => {
  //       reject(reader.error)
  //     }
  //   })
  // }
  //
  // function createCard(img) {
  //   return (type === 'serial')
  //     ? new Serial({
  //       type: type,
  //       title: movieTitle.value,
  //       img: img,
  //       URL: movieURL.value,
  //       description: movieDescription.value,
  //       seasons: movieSeasons.value
  //     })
  //     : new Film({
  //       type: type,
  //       title: movieTitle.value,
  //       img: img,
  //       URL: movieURL.value,
  //       description: movieDescription.value
  //     })
  // }
  //
  // function addCard(card) {
  //   arr.push(card)
  //   addForm.reset()
  //   movieSeasons.classList.remove('hidden')
  // }
  //
  // //Слушатели
  // formToggle.addEventListener('click', (e) => {
  //   if (e.target.classList.contains('form__content-type')) {
  //     type = e.target.value
  //     movieSeasons.classList.toggle('hidden')
  //   }
  // })
  //
  // addButton.addEventListener('click', () => {
  //   (moviePoster.files[0])
  //       ? getPoster().then((res) => {
  //         addCard(createCard(res))
  //       })
  //       : addCard(createCard(null))
  // })
  //
  // btn.addEventListener('click', () => {
  //   for (let item of arr) {
  //     let li = document.createElement('li')
  //     cardContainer.append(li)
  //     li.classList.add('movie-item')
  //
  //     const type = document.createElement('span')
  //     type.innerText = item.type
  //     li.append(type)
  //     type.classList.add('txt')
  //
  //     if (item.title) {
  //       const ttl = document.createElement('span')
  //       ttl.innerText = item.title
  //       li.append(ttl)
  //       ttl.classList.add('txt')
  //     }
  //
  //     if (item.description) {
  //       const description = document.createElement('p')
  //       description.innerText = item.description
  //       li.append(description)
  //       description.classList.add('txt')
  //     }
  //
  //     if (item.movURL) {
  //       const movURL = document.createElement('a')
  //       movURL.href = item.movURL
  //       li.append(movURL)
  //       movURL.setAttribute('target', '_blank')
  //       movURL.innerText = 'Смотреть'
  //       movURL.classList.add('link')
  //     }
  //
  //     const posterWrap = document.createElement('div')
  //     li.append(posterWrap)
  //     posterWrap.classList.add('movie__poster-wrap')
  //     if (item.poster) {
  //       const poster = document.createElement('img')
  //       posterWrap.append(poster)
  //       poster.src = item.poster
  //       poster.classList.add('movie__poster')
  //     }
  //   }
  // })

  const token = 'K3TQ5TK-56Y4Q29-JB6M1X0-FNM94CC'
  const name = 'дневники вамп'


  const data = async () => {
    const result = await fetch(`https://api.kinopoisk.dev/movie?field=name&search=${name}&isStrict=false&token=${token}`, {
      // method: 'GET',
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    })

    return result.json()
  }

  data()
      .then((res) => {
        console.log(res)
      })
}
