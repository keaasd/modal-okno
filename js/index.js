// скрол блокируем
const disabledScroll = () => {

    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.scrollPosition = window.scrollY;

    document.body.style.cssText = `
            overflow: hidden;
            position: fixed;
            top: -${document.body.scrollPosition}px;
            left: 0;
            height: 100vw;
            width: 100vw;
            padding-right: ${widthScroll}px;
        `;
}
    const enabledScroll = () => {
        document.body.style.cssText = 'position: relative';
        window.scroll({top: document.body.scrollPosition})
    
}


{ // Модальное окно
    const presentOrderBtn = document.querySelector(
    '.present__order-btn');
    const pageOverlayModal = document.querySelector('.page__overlay_modal');
    const modalClose = document.querySelector('.modal__close');

    const handlerModal = (openBtn, modal, openSelector, closeTrigger, sk = 'medium') => {        
        let opacity = 0;        
        const speed = {
            slow: 15,
            medium: 8,
            fast: 1,
        };
        const openModal = () => {
            disabledScroll();
            modal.style.opacity = opacity;            
            modal.classList.add(openSelector);

            const timer = setInterval (() => {
                opacity += 0.02;
                modal.style.opacity = opacity;
                if (opacity >= 1) clearInterval(timer)
            }, speed[sk])
        };




    
    const closeModal = () => {
    
    const timer = setInterval (() => {
        opacity -= 0.02;
        modal.style.opacity;
        if (opacity <= 0) {
            clearInterval(timer)
            modal.classList.remove(openSelector);
            enabledScroll();
        }
    }, speed[sk])            
};

openBtn.addEventListener('click', openModal);                 

closeTrigger.addEventListener('click', closeModal);
// клик мимо модального окна
modal.addEventListener('click', () => {
    if (event.target === modal) {
        closeModal()
    }
    
})
    };

    handlerModal(presentOrderBtn, 
        pageOverlayModal, 
        'page__overlay_modal_open', 
        modalClose,
        'slow'
        );
}
{// Бургер меню
    const headerContactsBurger = document.querySelector('.header__contacts-burger');
    const headerContacts = document.querySelector('.header__contacts');

    const handlerBurger = (openBtn, menu, openSelector) => {
        openBtn.addEventListener('click', () => {
            menu.style.height = '';            
            if (menu.classList.contains(openSelector)) {
                menu.classList.remove(openSelector);
            } else {                
                menu.style.height = menu.scrollHeight + 'px';
                menu.classList.add(openSelector);
            }            
        })
    };


    handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open')


}
// contains - метод, возвращает булевое значение
// menu.classList.toggle(openSelector);
{// галерея

const portfolioList = document.querySelector ('.portfolio__list');
const pageOverlay = document.createElement('div');
pageOverlay.classList.add('page__overlay');

portfolioList.addEventListener('click', (event) => {
    
    const card = event.target.closest('.card');

    if (card) {
        document.body.append(pageOverlay);
        const title = card.querySelector('.card__client');

        const picture = document.createElement('picture');
            
        picture.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 1440px;
            `;

        picture.innerHTML = `
            <source srcset="${card.dataset.fullImage}.webp" type="image/webp"> 
            <img src="${card.dataset.fullImage}.jpg" alt="${title.textContent}">
        `;    

        // const img = document.createElement('img');
        // img.src = card.dataset.fullImage + '.jpg';
        // img.style.cssText = `
        //     position: absolute;
        //     top: 20px;
        //     left: 50%;
        //     transform: translateX(-50%);
        // `;

        pageOverlay.append(picture)       
        }
    })

    pageOverlay.addEventListener('click', () => {
        pageOverlay.remove();
        pageOverlay.textContent = '';
    })
}
{ // создание карточек портфолио на основе данных из json
    const COUNT_CARD = 2;
    const portfolioList = document.querySelector('.portfolio__list');
    const portfolioAdd = document.querySelector('.portfolio__add');

    const getData = () => fetch('db.json')                   
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw `xyt nfr позже, ошибка: $p{response.status}`
                }
            })
            .catch(error => console.error(error));                
    
    const createStore = async () => {
        const data = await getData();
        // const cardData = {
            
            return { 
                data,
                counter: 0,
                count: COUNT_CARD,
                get lenght() {
                    return this.data.length;
                },
                get cardData() {
                    const renderData = this.data.slice(this.counter, this.counter + this.count);
                    this.counter += renderData.length;
                    return renderData;
                }
        };        
    };

    const renderCard = data => {
        console.log(data);
        const cards = data.map(({ preview, year, type, client, image }) => { 
            
            // const  = item;

            const li = document.createElement('li');
            li.classList.add('portfolio__item');
            
            li.innerHTML = `
                <article class="card" tabindex="0" role="button" aria-label="открыть макет" data-full-image="${image}">
                <picture class="card__picture">
                    <source srcset="${preview}.avif" type="image/avif">
                    <source srcset="${preview}.webp" type="image/webp">
                    <img src="${preview}.jpg" alt="превью game over" width="166" height="103">
                </picture>

                <p class="card__data">
                    <span class="card__client">Клиент: ${client}</span>
                    <time class="card__date" datetime="${year}">год: ${year}</time>
                </p>

                <h3 class="card__title">${type}</h3>
                </article>
                `;
            
                return li;
        })
        portfolioList.append(...cards)
        // console.log(cards);
    };

    const inintPortfolio = async () => {
        const store = await createStore();
        
        renderCard(store.cardData);
        
        portfolioAdd.addEventListener('click', () => {
            
            console.log(store.cardData);
            console.log(store.length, store.counter);
            if (store.length === store.counter){
                portfolioAdd.remove();
            }
        })
    };
    inintPortfolio()
}
// portfolio__list  portfolio__add
// portfolioAdd

 // console.log(`getData())`, getData());


    // return this. текущий объект 25:09

    // createStore()

    // const arr = [1,2,3,4];
        
    // const result = arr.map((item, index, array) => {
    //         console.log(item)
    //         console.log(index)
    //         console.log(array)
    //         return {
    //             speaker: 'макс',
    //             day: item,

    //         }
    //             });
// const arr = [1,2,3,4];
//     arr.forEach((item, index, array) => {
//         console.log(item)
//         console.log(index)
//         console.log(array)
        
//     }) не возвращает результат.