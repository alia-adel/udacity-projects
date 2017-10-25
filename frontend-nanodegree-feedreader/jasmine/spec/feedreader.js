/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toEqual(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all has defined URL', function () {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();

            allFeeds.forEach((feed) => {
                console.log(feed.url);
                // Test that url is defined on the feed entry
                expect(feed.url).toBeDefined();
                // Test that the url value is not empty
                expect(feed.url.trim()).not.toBe('');
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all has defined name', function () {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();
            
            allFeeds.forEach((feed) => {
                console.log(feed.name);
                // Test that name is defined on the feed entry
                expect(feed.name).toBeDefined();
                // Test that the name value is not empty
                expect(feed.name.trim()).not.toBe('');
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            // Test that class 'menu-header exists'
            expect($('.menu-hidden').length).toEqual(1);

            //Test that element with class 'menu-header' is parent to the hidden navigation with class'slide-menu'
            expect($('.slide-menu')[0].parentElement)
                .toEqual($('.menu-hidden')[0]);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility on hamburger click', function () {
            // Trigger click on the menu icon
            $('.menu-icon-link').trigger('clic');
            // Since the page just loaded it's expected that the menu was hidden by default
            // Therefore clicking on the icon should show the menu & remove the 'menu-hidden' class
            expect($('.menu-hidden').length).toEqual(0);

            // Trigger click on the menu icon
            $('.menu-icon-link').trigger('click');
            // The menu is now visible, so triggering the click again
            // should now hide it by removing the 'menu-hidden' class
            expect($('.menu-hidden').length).toEqual(1);

        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            console.log(`Calling feed`);
            loadFeed(0, done);
        });

        it('loaded with at least one entry', function (done) {
            console.log(`Executing feed tests after callback was done`);
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();

            // Test that allFeeds object has at least one entry
            expect(allFeeds.length).toBeGreaterThan(0);

            // Test that '.feed' element is defined
            expect($('.feed')).toBeDefined();

            // Test that '.feed' element has at least one '.entry' element
            expect($('.feed').find('.entry')).toBeDefined();
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);

            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let feedOneName, feedTwoName, feedID = 0;
        let feedOneEntries, feedTwoEntries;


        beforeEach(function (done) {
            console.log(`Calling feed in new feed selection test`);
            loadFeed(feedID, done);
        });

        it('loads the first feed', function (done) {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();

            // Test that allFeeds object has at least one entry
            expect(allFeeds.length).toBeGreaterThan(0);

            feedOneName = $('.header-title').html();
            feedOneEntries = $('.feed').find('.entry');
            console.log(`First Feed: ${feedOneName}:
                ${feedOneEntries}`);

            feedID++;
            done();
        });

        it('loads the second feed', function (done) {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();

            // Test that allFeeds object has at least one entry
            expect(allFeeds.length).toBeGreaterThan(1);

            feedTwoName = $('.header-title').html();
            feedTwoEntries = $('.feed').find('.entry');
            console.log(`Second Feed: ${feedTwoName}:
                ${feedTwoEntries}`);
            feedID++;
            done();
        });

        it('html loaded second feed title is different than the previously loaded first feed title', function () {
            console.log(`First Feed title: ${feedOneName},
            Second Feed title: ${feedTwoName}`);
            expect(feedTwoName).not.toEqual(feedOneName);
        });
    });
}());
