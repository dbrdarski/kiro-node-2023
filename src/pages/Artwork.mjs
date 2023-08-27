import Grid from "../components/Grid.mjs"
import GridItem from "../components/GridItem.mjs"

export default ({
  paintings,
  watercolours,
  drawings,
  sculptures
}) => HtmlPage => (
  <HtmlPage background="#ccccc3">
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
        thumb={watercolours.images[1].filename}
        link="/artwork/watercolours"
        column="3 / span 3"
        row="4 / span 2"
      />
      <GridItem
        title="Drawings"
        album="drawings"
        thumb={drawings.images[3].filename}
        link="/artwork/drawings"
        column="6 / span 3"
        row="3 / span 2"
      />
      <GridItem
        title="Paintings"
        album="paintings"
        thumb={paintings.images[83].filename}
        link="/artwork/paintings"
        column="8 / span 3"
        row="1 / span 2"
      />
      <GridItem
        title="Sculptures"
        album="sculptures"
        link="/artwork/sculptures"
        thumb={sculptures.images[1].filename}
        link="/artwork/sculptures"
        column="11 / span 3"
        row="4 / span 2"
      />
      <GridItem
        column="11 / span 3"
        row="2 / span 2"
      />
      <GridItem
        column="6 / span 2"
        row="1 / span 2"
      />
      <GridItem
        column="1 / span 2"
        row="4 / span 2"
      />
      <GridItem
        column="6 / span 5"
        row="5 / span 1"
      />
      <GridItem
        column="11 / span 3"
        row="1 / span 1"
      />
      <GridItem
        column="9 / span 2"
        row="3 / span 2"
      />
    </Grid>
  </HtmlPage>
)
