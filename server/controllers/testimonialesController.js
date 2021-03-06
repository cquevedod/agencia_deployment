const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = (req, res) => {
    Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }))
}

exports.addTestimonial = (req, res) => {
    let {nombre, correo, mensaje} = req.body;

    let errores = [];
    if(!nombre) {
        errores.push({'mensaje' : 'Agrega tu Nombre'})
    }
    if(!correo) {
        errores.push({'mensaje' : 'Agrega tu Correo'})
    }
    if(!mensaje) {
        errores.push({'mensaje' : 'Agrega un Mensaje'})
    }

    //Revisar por errores
    if(errores.length > 0) {
        //muestra la vista con errores
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje
        })
    } else {
        //almacenar en la base de datos
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error)) 
    }
}