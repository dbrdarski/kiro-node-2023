import Grid from "../components/Grid.mjs"
import GridItem from "../components/GridItem.mjs"
import { artworkMenuSlide, projectsMenuSlide } from "../data.mjs"

export default ({
  // paintings,
  // watercolours,
  // drawings,
  // sculptures
}) => HtmlPage => (
  <HtmlPage background="#ccccc3">
    <div class="menu-slider">
      <div class="menu-slider-item">
        <Grid content={(Slide) => (
          <>
            <Slide>
              {artworkMenuSlide.map(thumb => (
                <GridItem {...thumb} />
              ))}
            </Slide>
            <Slide>
              {projectsMenuSlide.map(thumb => (
                <GridItem {...thumb} class="reversable" />
              ))}
            </Slide>
          </> )} />
        </div>
    </div>
  </HtmlPage>
)
