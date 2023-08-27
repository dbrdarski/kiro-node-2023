import Grid from "../components/Grid.mjs"
import GridItem from "../components/GridItem.mjs"

export default ({
  paintings,
  watercolours,
  drawings,
  sculptures
}) => HtmlPage => (
  <HtmlPage>
    <Grid>
      <GridItem
        title="Planetarium"
        album="paintings"
        thumb={paintings.images[18].filename}
        link="/artwork/paintings"
        column="1 / span 5"
        row="1 / span 3"
      />
      <GridItem
        title="Watercolours"
        album="watercolours"
        thumb={watercolours.images[11].filename}
        link="/artwork/watercolours"
        column="4 / span 1"
        row="3 / span 2"
      />
      <GridItem
        title="Drawings"
        album="drawings"
        thumb={drawings.images[3].filename}
        link="/artwork/drawings"
        column="5 / span 2"
        row="4 / span 2"
      />
      <GridItem
        title="Sculptures"
        album="sculptures"
        link="/artwork/sculptures"
        thumb={sculptures.images[6].filename}
        column="6 / span 2"
        row="2 / span 2"
      />
      {/* <div class="gg-item" style="grid-column: 7 / span 1; grid-row: 4 / span 2">
      <div class="gg-item-inner"></div>
    </div> */}
      <GridItem
        title="Film"
        column="2 / span 2"
        row="4 / span 2"
      />
      <GridItem
        title="D"
        column="1 / span 1"
        row="4 / span 2"
      />
      <GridItem
        title="C"
        column="5 / span 1"
        row="2 / span 2"
      />
      <GridItem
        title="Literature"
        link="/artwork/sculptures"
        column="5 / span 2"
        row="1 / span 1"
      />
      <GridItem
        title="B"
        column="5 / span 1"
        row="1 / span 2"
      />
      <GridItem
        title="B"
        column="4 / span 1"
        row="1 / span 2"
      />
    </Grid>
  </HtmlPage>
)
