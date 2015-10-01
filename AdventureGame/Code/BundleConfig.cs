using System.Web.Optimization;

namespace AdventureGame.Web
{
    public class BundleConfig
    {
        #region Public Methods

        public static void ConfigureBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/game").Include(
                "~/Scripts/angular.*",
                "~/Scripts/angular-*",
                "~/Scripts/ngStorage*",
                "~/Scripts/globals*",
                "~/Scripts/Engine/adventuregame.definitioncollection*",
                "~/Scripts/Engine/adventuregame.objectcollection*",
                "~/Scripts/Engine/adventuregame.module*",
                "~/Scripts/Engine/adventuregame.*")
                .IncludeDirectory("~/Scripts/Actions", "*.js", true)
                .IncludeDirectory("~/Scripts/Items", "*.js", true)
                .IncludeDirectory("~/Scripts/Enemies", "*.js", true)
                .IncludeDirectory("~/Scripts/Locations", "*.js", true)
                );
        }

        #endregion Public Methods
    }
}