import { ApplicationJSON } from "../../../generic/interfaces/ApplicationJSON";
import { Environment } from "../../../generic/interfaces/transformer/Environment";
import PageTransformer from "../components/ApplicationPage";
import LayoutTransformer from "../components/LayoutTransformer.ts";
export const transformApplication = async (application: ApplicationJSON, env: Environment) => {
    const pages = PageTransformer.getPageNodes(application);
    const layouts = PageTransformer.getLayoutNodes(application);
    if (pages) {
        for (const page of pages) {
            await PageTransformer.createPage(page, env);
        }
    }
    if (layouts) {
        for (const layout of layouts) {
            if (layout.children && layout.type === "internal") {
                await LayoutTransformer.createPage(layout, env);
            } else {
                // console.log("external layout resource", layout);
            }
            // TODO: check what to do if we have an external layout
        }
    }
    console.log("done with transforming application", application.application.name);
};

export default transformApplication;
