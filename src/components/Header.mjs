export default ({ props }) => {
  return (
    <header id="header">
      <span id="menu-toggle">
        <span class="menu-line"></span>
        <span class="menu-line"></span>
        <span class="menu-line"></span>
      </span>
      <section id="main-menu">
        <div class="logo">
          <div class="site-name">
            Kiro Urdin
          </div>
          <div class="site-description">
            Artistic Founder of
            <br />
            Planetarism Movement
          </div>
        </div>
        <nav>
          <ul class="menu">
            {props.menuItems.map(item => <li><a href={item.url}>{item.title}</a></li>)}
          </ul>
        </nav>
        <div class="legal-social">
          <ul class="social-links"> {
            props.socialProfiles.map(
              profile => (
                <li class="social-link">
                  <a href={profile.url} id={profile.name} target="_blank" />
                </li>
              ))}
          </ul>
          <div class="legal">
            <small>© Kiro Urdin</small>
            <br />
          </div>
        </div>
      </section>
    </header>
  )
}
