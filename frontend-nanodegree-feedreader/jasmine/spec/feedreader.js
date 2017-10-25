/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function () {
    /**
     * a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /**
         * Make sure that the allFeeds variable 
         * has been defined and that it is not empty.
         */
        it('are defined', function () {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();
            // Test that allFeeds' length is greater than Zero
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /**
         * A test that loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('all has defined URL', function () {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();

            allFeeds.forEach((feed) => {
                // Test that url is defined on the feed entry
                expect(feed.url).toBeDefined();
                // Test that the url value is not empty
                expect(feed.url.trim()).not.toEqual('');
            });
        });


        /**
         * A test that loops through each feed in the allFeeds object 
         * and ensures it has a name defined and that the name is not empty. 
         */
        it('all has defined name', function () {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();

            allFeeds.forEach((feed) => {
                // Test that name is defined on the feed entry
                expect(feed.name).toBeDefined();
                // Test that the name value is not empty
                expect(feed.name.trim()).not.toBe('');
            });
        });
    });


    /**
     * "The menu" test suite
     * A test that ensures the menu element is hidden by default.
     */
    describe('The menu', function () {
        // Test that when the page opens the menu is hidden by default
        it('is hidden by default', function () {
            // Test that class 'menu-header' exists
            expect($('.menu-hidden')).toBeDefined();
            expect($('.menu-hidden').length).toBeGreaterThan(0);
        });


        it('shows the menu when clicked', function() {   
            // Trigger click on the menu icon
            $('.menu-icon-link').trigger('click');

            slideMenuOrientation = parseInt($('.slide-menu').css('transform').split(',')[4].trim());
            console.log(`Transform value: ${slideMenuOrientation}`);
            expect(slideMenuOrientation).toBeGreaterThan(-1);
        });

        it('hides the menu when clicked', function() {
            // Trigger click on the menu icon
            $('.menu-icon-link').trigger('click');

            slideMenuOrientation = parseInt($('.slide-menu').css('transform').split(',')[4].trim());
            console.log(`Transform value: ${slideMenuOrientation}`);
            expect(slideMenuOrientation).not.toBeGreaterThan(0);
        });

    });


    /**
     * A new test suite named "Initial Entries"
     * A test that ensures when the loadFeed function is called and completes its work, 
     * there is at least a single .entry element within the .feed container.
     */
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            // load the first feed
            loadFeed(0, done);
        });


        it('loaded with at least one entry', function (done) {
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


    /**
     * A new test suite named "New Feed Selection"
     * A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    describe('New Feed Selection', function () {
        let feedOneName, feedTwoName, feedID = 0;
        let feedOneEntries, feedTwoEntries;

        beforeEach(function (done) {
            // before each test load a different feed
            loadFeed(feedID, done);
        });


        /**
         * Load the first feed & retrieve its
         * name & data & save them in feedOneName & feedOneEntries objects
         */
        it('loads the first feed', function (done) {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();

            // Test that allFeeds object has at least one entry
            expect(allFeeds.length).toBeGreaterThan(0);

            feedOneName = $('.header-title').html();
            feedOneEntries = $('.feed').find('.entry');
            // Increment the feed Id to get a new one in the next test
            feedID++;

            done();
        });


        /**
         * Load the second feed & retrieve its
         * name & data & save them in feedTwoName & feedTwoEntries objects
         */
        it('loads the second feed', function (done) {
            // Test that allFeeds is defined
            expect(allFeeds).toBeDefined();

            // Test that allFeeds object has at least one entry
            expect(allFeeds.length).toBeGreaterThan(1);

            feedTwoName = $('.header-title').html();
            feedTwoEntries = $('.feed').find('.entry');

            done();
        });


        /**
         * Test that the values saved for the first feed & the second feed do not match
         */
        it('DOM data for second feed not match DOM data for first feed', function () {
            // Test that feed name do not match
            expect(feedTwoName).not.toEqual(feedOneName);

            // Test that feed entries do not match
            // using not.toEqual returned 'true' therefor not.toBe used instead
            expect(feedTwoEntries).not.toBe(feedOneEntries);
        });
    });
}());
