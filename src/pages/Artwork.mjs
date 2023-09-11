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
        <Grid>
          {projectsMenuSlide.map(thumb => (
            <GridItem {...thumb} />
          ))}
        </Grid>
      </div>
      <div class="menu-slider-item">
        <Grid>
          {artworkMenuSlide.map(thumb => (
            <GridItem {...thumb} />
          ))}
        </Grid>
      </div>
      <div class="menu-slider-item" id="xx2" style="width: 0">
        <Grid>
          {projectsMenuSlide.map(thumb => (
            <GridItem {...thumb} />
          ))}
        </Grid>
      </div>
    </div>
  </HtmlPage>
)
