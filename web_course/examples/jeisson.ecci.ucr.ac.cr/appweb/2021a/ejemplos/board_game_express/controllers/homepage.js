class HomepageController {
  getHomepage(req, res) {
    res.render('index', {
      title: 'Homepage',
      stylesheets: ['/css/board.css'],
      scripts: ['js/homepage.js'],
    });
  }
}

// Singleton
const homepage = new HomepageController();
export default homepage;
