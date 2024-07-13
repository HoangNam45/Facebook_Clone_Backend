class SiteController {
    // [POST] /register
    register(req, res) {
        const formData = req.body;
        console.log(formData);
    }
}
module.exports = new SiteController();
