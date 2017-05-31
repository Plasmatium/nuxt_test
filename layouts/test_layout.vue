<template>
  <div id="layout">
    <div id="sidebar">
      <div id="sidebar-header">
        <h3>Lorem ipsum dolor.</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis dignissimos accusamus quos molestiae repellat maxime animi magni veritatis rerum quis quia hic debitis praesentium velit nihil voluptates vel deserunt autem exercitationem, provident sed nobis. Ratione, ipsum commodi accusamus dignissimos facere aut laudantium. Laudantium earum corrupti a nesciunt expedita, architecto repellendus.</p>
      </div>
      <ul id="contents">
        <li class="contents-item1"><a href="/items/item_1">link to item1</a></li>
        <li class="contents-item2"><a href="/items/item_2">link to item2</a></li>
        <li class="contents-item3"><a href="/items/item_3">link to item3</a></li>
        <li class="contents-item4"><a href="/items/item_4">link to item4</a></li>
        <li class="contents-item5"><a href="/items/item_5">link to item5</a></li>
      </ul>
    </div>
    <div id="content">
      <nuxt />
    </div>
  </div>
</template>

<style type="scss">
/* IDEA:  */
h1.title {
  color: orange;
}
#layout {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;

  flex-direction: row;
}
#sidebar {
  border: solid 1px #efefef;
  width: 15%;
  padding: 1.5em;
}
#content {
  border: solid 1px #efefef;
  width: 62%;
}
</style>
