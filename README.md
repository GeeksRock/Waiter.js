# Waiter.js

Any decent restaurant serves your meals to you in courses. If your waiter was to bring your main course (spaghetti, perhaps?) when he brought your salad, you might become overwhelmed. Your spaghetti would most likely be cold by the time you finished your first course, a house salad with a light vinegrette dressing.

Software end users are no different than patrons in a restaurant. As developers, we should always strive to provide great customer service. If you present users with an excessive amount of data, they too might become overwhelmed. And that could be bad for business. That's where Waiter.js comes in.
***
<p data-height="268" data-theme-id="11599" data-slug-hash="jWKYbE" data-default-tab="result" data-user="GeeksRock" data-preview="true" class='codepen'>See the Pen <a href='http://codepen.io/GeeksRock/pen/jWKYbE/'>Waiter.js Demo</a> by Geeks Rock (<a href='http://codepen.io/GeeksRock'>@GeeksRock</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>   

[Understanding the Waiter.js API](https://github.com/GeeksRock/Waiter.js/wiki/Understanding-the-Waiter.js-API)
***

Waiter.js - A complete, light-weight paging solution that allows you to serve data to your users in courses (or pages, as it were). The API is extremely easy to use. To get started, just give Waiter.js your order! 

  + var requestedPage = Waiter.takeDataOrder(myOrder, recordsPerPage).serveSelectedPage(pageNumber);⋅

When you're ready for the next page, just ask for it! 

  + var nextPage = Waiter.serveNextPage();

Prefer your pages "shaken, not stirred"...or **sorted**? That's not a problem! Just let Waiter.js know. 

  + var sortedPageData = Waiter.takePageOrder(pageNumber, sortField, sortDirection);

See? Just as you would in any restaurant (well, maybe not at a buffet) you simply present Waiter.js with your order, and your page(s) are served up!
