using System.Web.Mvc;

namespace AdventureGame.Web
{
    public class HomeController : Controller
    {
        #region Public Methods

        public ActionResult Index()
        {
            return View();
        }

        #endregion Public Methods
    }
}