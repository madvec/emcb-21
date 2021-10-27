(function (d) {
    "use strict";
    const q = (selector, target) => (target || d).querySelector(selector);
    const qa = (selector, target) => (target || d).querySelectorAll(selector);
    // Script for CountDown
    const CountDown = {
        init: function () {
            let target = new Date("Nov 18, 2021 00:00:00").getTime();
            let distance;
            let now;
            let countDown = document.querySelector(".another-countdown");

            if (countDown) {
                setInterval(() => {
                    now = new Date().getTime();
                    distance = target - now;
                    let days = this.getDays(distance);
                    let hours = this.getHours(distance);
                    let minutes = this.getMinutes(distance);
                    let seconds = this.getSeconds(distance);
                    document.getElementById("day-number").innerHTML = days;
                    document.getElementById("hour-number").innerHTML = (
                        "0" + hours.toString()
                    ).slice(-2);
                    document.getElementById("minute-number").innerHTML = (
                        "0" + minutes.toString()
                    ).slice(-2);
                    document.getElementById("second-number").innerHTML = (
                        "0" + seconds.toString()
                    ).slice(-2);
                }, 1000);
            }
        },
        getDays: function (distance) {
            return Math.floor(distance / (1000 * 60 * 60 * 24));
        },

        getHours: function (distance) {
            return Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
        },

        getMinutes: function (distance) {
            return Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        },

        getSeconds: function (distance) {
            return Math.floor((distance % (1000 * 60)) / 1000);
        },
    };
    const InView = {
        init: function () {
            var e = document.querySelectorAll(".inview-down-up");
            e &&
                new pl.ScrollFire(e, { method: "InRange", rangeMin: 10, rangeMax: 80 }).inview.add(function (e) {
                    pl.Classie.hasClass(e, "apply-inview-down-up") || pl.Classie.addClass(e, "apply-inview-down-up");
                });
        }
    };
    /**
 * Contact
 */
    const Contact = {
        /**
         * @type jQuery
         */
        $elem: null,

        /**
         * Initialize page part.
         */
        init: function () {
            var contactForm = document.querySelector(".block.contact .contact-form");
            if (contactForm.length != 0) {

                // Initialize contact form.
                this.form = new pl.ContactForm(contactForm, {
                    url: './send-mail.php',
                    //url: './process-ajax.php',
                    inputSelectors: [
                        "input[type=text]",
                        "textarea"
                    ],
                    useAjax: true,
                });

                this.onError = this.onError.bind(this);
                this.onSuccess = this.onSuccess.bind(this);
                this.onSending = this.onSending.bind(this);

                this.form.error.add(this.onError);
                this.form.success.add(this.onSuccess);
                this.form.sending.add(this.onSending);
                this.form.inputError.add(this.handleInputError.bind(this));
            }
        },
        /**
         * Fires if message fails.
         * @param {HTMLElement} form
         * @param {string} status
        * @param {string} statusText
        */
        onError: function (status, statusText, form) {

            var statusMessage = form.querySelector('.status-message');
            statusMessage.classList.remove('hidden');
            statusMessage.innerHTML = '<div class="message error">There was an error sending your message. Please, try it again later.</div>';

            this.removeFormStatus(form);
        },
        /**
         * Handle input error event.
         * @param {HTMLInputElement} input
         */
        handleInputError: function (input) {
            var clue = input.dataset['clue'];

            if (clue) {
                input.setAttribute('placeholder', clue);
            }
        },

        /**
         * Fires if message is sended successfully.
         * @param {HTMLElement} form
         * @param {any} response
         * @param {string} status
         * @param {string} statusText
         */
        onSuccess: function (response, status, statusText, form) {

            var statusMessage = form.querySelector('.status-message');
            statusMessage.classList.remove('hidden');
            statusMessage.innerHTML =
                `<div class="success">
                <div class="message">
                    <div>Your message was sent</div>
                </div>
            </div>`;
            //Page.ga('Contacto', 'Formulario Home enviado', '');

            this.removeFormStatus(form);
        },
        /**
         * Fires when message is sending.
         * @param {HTMLElement} form
         */
        onSending: function (form) {
            var statusMessage = form.querySelector('.status-message');
            var btnSend = form.querySelector('input[type=submit]');
            var formContainer = form.querySelector('.form-container');
            btnSend.disabled = true;
            statusMessage.classList.remove('hidden');
            formContainer.classList.add('hidden');
            statusMessage.innerHTML =
                `<div class="sending">
                <div class="message">
                    <div>Sending your message, please wait...</div>
                    <div class="spinner"><img class="img-fluid" src="./design/images/spinner.svg" alt="spinner"></div>
                </div>
            </div>`;
        },
        /**
         * Remove Text
         */
        removeFormStatus: function (form) {

            var statusMessage = form.querySelector('.status-message');
            var btnSend = form.querySelector('input[type=submit]');
            var formContainer = form.querySelector('.form-container');
            var delay = 6000;

            setTimeout(() => {
                /**
                 * Get inputs and textarea to reset the placeholder
                 */
                this.form.texts.forEach(input => {
                    input.setAttribute('placeholder', input.getAttribute('data-placeholder'));
                });
                this.form.reset();
                btnSend.disabled = false;
                statusMessage.classList.add('hidden');
                formContainer.classList.remove('hidden');

            }, delay);
        }
    };
    // Calling Functions
    CountDown.init();
    InView.init();
    Contact.init();
})(document);
