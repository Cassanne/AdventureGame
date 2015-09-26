using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace AdventureGame.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        #region Protected Methods

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.ConfigureBundles(BundleTable.Bundles);
        }

        #endregion Protected Methods
    }
}