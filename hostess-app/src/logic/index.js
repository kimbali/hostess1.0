const validateEmail = require('../utils/validate-email')

const logic = {

    url: 'https://lit-brook-74141.herokuapp.com/api',
    _url: 'http://localhost:8080/api',

    _call(path, method, headers, body, expectedStatus) {
        const config = { method }

        if (headers) config.headers = headers
        if (body) config.body = body

        return fetch(`${this.url}/${path}`, config)
            .then(res => {
                if (res.status === expectedStatus) {
                    return res
                } else
                    return res.json()
                        .then(({ message }) => {
                            throw new Error(message)
                        })
            })
    },

    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldName !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    _validateEmail(email) {
        if (!validateEmail(email)) throw new Error('invalid email')
    },

    _validateNumberField(num, value) {
        if (typeof value !== 'number') throw new Error(`invalid ${num}`)
    },

    registerHostess(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('hostess-register', 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ email, password }), 201)
                    .then(() => true)
            })
    },

    registerBusiness(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('business-register', 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ email, password }), 201)
                    .then(() => true)

            })
    },

    authenticateHostess(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('hostess-auth', 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    authenticateBusiness(email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateEmail(email)
                this._validateStringField('password', password)

                return this._call('business-auth', 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ email, password }), 200)
                    .then(res => res.json())
                    .then(res => res)
            })
    },

    retrieveHostess(id, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`hostess-details/${id}`, 'GET', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
            .then(res => res.hostess)
    },

    retrieveBusiness(id, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`business-details/${id}`, 'GET', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
            .then(res => res.business)
    },

    retrieveEvent(id, idE, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`event-details/${id}/${idE}`, 'GET', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
            .then(res => res.event)
    },

    updatePasswordHostess(id, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._call(`hostess-edit-password/${id}`, 'PATCH', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password, newPassword }), 200)
                    .then(res => res.json())
            })
    },

    updatePasswordBusiness(id, password, newPassword, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', password)
                this._validateStringField('new password', newPassword)

                return this._call(`business-edit-password/${id}`, 'PATCH', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password, newPassword }), 200)
                    .then(res => res.json())
            })
    },

    editHostessProfile(id, password, name, birth, origin, phone, myself, gender, languages, jobType, photo, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('birth', birth)
                this._validateStringField('origin', origin)
                this._validateStringField('gender', gender)
                this._validateStringField('phone number', phone)
                this._validateStringField('job type', jobType)
                this._validateStringField('description of myself', myself)

                if (!(languages instanceof Array)) throw new Error('invalid languages')
                return this._call(`hostess-update/${id}`, 'PATCH', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ password, name, birth, origin, phone, myself, gender, languages, jobType, photo }), 200)
            })
            .then(res => res.json())
    },

    editBusinessProfile(id, password, name, web, boss, phone, philosophy, businessCard, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('name', name)
                this._validateStringField('contact name', boss)
                this._validateStringField('contact phone', phone)
                this._validateStringField('web page', web)
                this._validateStringField('company philosophy', philosophy)

                return this._call(`business-update/${id}`, 'PATCH', { authorization: `bearer ${token}`, 'content-type': 'application/json' }, JSON.stringify({ password, name, web, boss, phone, philosophy, businessCard }), 200)
            })
            .then(res => res.json())
    },

    unregisterHostess(id, password, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', password)

                return this._call(`unregister-hostess/${id}`, 'DELETE', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password }), 200)
            })
            .then(res => res.json())
    },

    unregisterBusiness(id, password, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('password', password)

                return this._call(`unregister-business/${id}`, 'DELETE', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ password }), 200)
            })
            .then(res => res.json())
    },

    searchWorkers(id, gender, idioms, jobType, token) {
        return Promise.resolve()
            .then(() => {
                let languages = idioms.join('|')
                return this._call(`${id}/search/?gender=${gender}&jobType=${jobType}&languages=${languages}`, 'GET', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
            .then(res => res.hostesses)
    },

    newEvent(id, location, date, hours, salary, title, goal, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('location', location)
                this._validateStringField('title', title)
                this._validateStringField('hours', hours)
                this._validateStringField('goal', goal)
                this._validateStringField('salary', salary)
                this._validateStringField('hours', hours)


                return this._call(`create-event/${id}`, 'POST', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ location, date, hours, salary, title, goal }), 200)
            })
            .then(res => res.json())
            .then(res => res.id)
    },

    makeBriefing(id, idE, contactName, contactPhone, briefing, token) {
        return Promise.resolve()
            .then(() => {
                this._validateStringField('contact name', contactName)
                this._validateStringField('contact phone', contactPhone)
                this._validateStringField('briefing', briefing)

                return this._call(`breafing-event/${id}/${idE}`, 'POST', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, JSON.stringify({ contactName, contactPhone, briefing }), 200)
            })
            .then(res => res.json())
    },

    sendRequest(id, idH, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`send-request/${id}/${idH}`, 'PUT', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    acceptRequest(id, idB, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`accept-request/${id}/${idB}`, 'PUT', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    joinToEvent(id, idE, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`join-to-event/${id}/${idE}`, 'PUT', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    closeEvent(id, idH, idE, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`close-event/${id}/${idE}/${idH}`, 'PUT', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },

    iAssist(id, idE, token) {
        return Promise.resolve()
            .then(() => {
                return this._call(`assist/${id}/${idE}`, 'PUT', { authorization: `bearer ${token}`, 'Content-Type': 'application/json' }, undefined, 200)
            })
            .then(res => res.json())
    },





}


module.exports = logic