// waiter.js

var Waiter = (function () {
    var data = null;
    var criteria = null;
    var direction = 0;
    var pages = undefined;
    var currentPage = undefined;
    var currentPageNumber = undefined;
    var recordsPerPage = 0;
    var numberOfPages = 0;

    function sortPage (page, criteria, direction) {
        if (Number(direction) === 0) {
            return page.sort(function (a, b) {
                var x = a[criteria];
                var y = b[criteria];

                if (typeof x == "string") {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }

                return ((x < y) ? -1 : ((x > y) ? 1 : 0));

            });
        } else {
            return page.sort(function (b, a) {
                var x = a[criteria];
                var y = b[criteria];

                if (typeof x == "string") {
                    x = x.toLowerCase();
                    y = y.toLowerCase();
                }

                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        return this;
    }

    return {
        takeDataOrder: function (data, records_per_page) {
            var data_row = undefined, count = 0, next_page_start = 0, next_page_end = undefined;
            
            if (data !== null && data !== undefined && data.length > 0) {
                this.data = data;
                if (records_per_page !== null && records_per_page !== undefined && !isNaN(Number(records_per_page)) && records_per_page > 0) {
                    this.recordsPerPage = Number(records_per_page);
                    next_page_end = this.recordsPerPage;
                    this.numberOfPages = Math.max(Math.ceil(Number(this.data.length / this.recordsPerPage)));
                    if (this.numberOfPages > 0) {
                        this.pages = [];
                        while (count < this.numberOfPages) {
                            this.pages.push(this.data.slice(next_page_start, next_page_end));
                            count++;
                            next_page_start += Number(this.recordsPerPage);
                            next_page_end += Number(this.recordsPerPage);
                        }
                        this.currentPage = this.pages[0];
                    } else {
                        console.error("Waiter.js is unable to produce pages from your data.");
                    }
                } else {
                    console.error("Waiter.js is unable to produce pages from your data.");
                }
            } else {
                console.error("Waiter.js is unable to produce pages from your data.");
            }
            return this;
        },
        takePageOrder: function (page_number, criteria, direction) {
            if (this.pages.length > 0) {
                if (!isNaN(Number(page_number))) {
                    this.currentPageNumber = Number(page_number);
                    this.currentPage = this.pages[Number(this.currentPageNumber) - 1];
                    var sortedPage = [];
                    if (criteria.trim() !== null && criteria.trim() !== undefined && criteria.trim().length > 0 && direction !== null && direction !== undefined && !isNaN(Number(direction))) {
                        this.criteria = criteria;
                        if (Number(direction) === 0 || Number(direction) === 1) {
                            this.direction = Number(direction);
                        } else {
                            this.direction = 0;
                        }   
                        sortedPage = sortPage(this.currentPage, this.criteria, this.direction);
                        return sortedPage;
                    } else {
                        console.error("Waiter.js is unable to return a page. The criteria and/or direction you provided is invalid.");
                    }
                } else {
                    console.error("Waiter.js is unable to return a page. The page number your provided is invalid.");
                }
            } else {
                console.error("Waiter.js was unable to produce pages from your data. There are no pages to return.");
            }
        },
        serveSelectedPage: function (page_number) {
            if (!isNaN(Number(page_number))) {
                this.currentPageNumber = Number(page_number);
                this.currentPage = this.pages[Number(this.currentPageNumber) - 1];
            }
            return this.currentPage;
        },
        serveNextPage: function () {
            if (Number(this.currentPageNumber) + 1 <= Number(this.numberOfPages)) {
                this.currentPageNumber = Number(this.currentPageNumber) + 1;
                this.currentPage = this.pages[Number(this.currentPageNumber) - 1];
            }

            return this.currentPage;
        },
        servePrevPage: function () {
            if (Number(this.currentPageNumber) - 1 >= 1) {
                this.currentPageNumber = Number(this.currentPageNumber) - 1;
                this.currentPage = this.pages[Number(this.currentPageNumber) - 1];
            }

            return this.currentPage;
        },
        servePageData: function () {
            return {
                data: this.data,
                sort_criteria: this.criteria,
                sort_direction: this.direction,
                pages: this.pages,
                current_page: this.currentPage,
                current_page_number: this.currentPageNumber,
                records_per_page: this.recordsPerPage,
                number_of_pages: this.numberOfPages
            };
        },
        servePages: function () {
            return this.pages;
        }
    }
})();
