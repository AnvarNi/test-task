const openPopUp = document.getElementById('open-pop-up');
const closePopUp = document.getElementById('pop-up-close');
const popUp = document.getElementById('pop-up');

const sendButton = document.querySelector('.send-btn');
const successMessage = document.querySelector('.success');
const failureMessage = document.querySelector('.failure')

openPopUp.addEventListener('click', function(e){
    e.preventDefault();
    popUp.classList.add('active');
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        popUp.classList.remove('active');
    }
})

sendButton.addEventListener('click', () => {
    sendNameAndEmail();
})

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    })

    if (!response.ok) {
        failureMessage.classList.add('active');
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
    } else {
        successMessage.classList.add('active');
    }

    return await response.json();
}

const sendNameAndEmail = () => {
    const dataForm = document.querySelector('.data-form');

    dataForm.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(dataForm);

        sendData('https://jsonplaceholder.typicode.com/users', formData).then(() => {
            dataForm.reset();
        })
        .catch((err) => {
            console.log(err);
        });
    })
}