<img src="https://github.com/footwork-web/related-items/blob/main/_THIS%20SHOULDN'T%20BE%20TOO%20BAD_%20cropped.png" />

# The Hero's Journey (or, the scaling of a back-end)

Ever wondered how to build and scale the back-end of a web application to handle massive amounts of traffic? So did I, until, through trial and error, I managed to take a legacy codebase with 170 million rows of data, and increase its capacity from 100 to 1,300 users per second. It was an epic journey, full of traps around every turn, moments of "I am God!" followed by "Why me, God?" and countless queries, Docker instances, EC2 containers and stress tests.

The work that I did is not well-represented in this repo, because it was almost entirely a back-end project. However, I thought I would build out this ReadMe to represent the work that I did, and explain how one might follow in my footsteps, and perhaps avoid some of the pitfalls I faced in scaling a back end. It will not be an easy journey, and it is certainly not for the faint of heart. But for those who dare, come along with our hero on this noble quest!

## Chapter 1. The Call to Adventure

To begin with, I was tasked with taking a legacy codebase, building a back-end for it, and deploying it with the goal of handling production-level web traffic. The particular service I inherited was a related-items service of a sports retail website. I knew this was a journey that would be difficult and full of challenges, but I set off with high hopes and a smile on my face.

## Chapter 2. Crossing the Threshold

The first challenge of the journey was deciding on a database to use. The dataset would contain around 170 million records of data, and production-level traffic would mean potentially a thousand users accessing the site every second. The database's performance would play a major role in whether I succeeded or failed. I needed to optimize.

I compared a SQL database, PostgreSQL, and a noSQL database, Cassandra. After what felt like (and was) hours, I had uploaded the 170 million records to both databases. I ran my initial queries on both databases. With Cassandra, the queries took about 40 ms. To my shock, Postgres queries took about one minute apiece. I figured something was amiss. I would have to conquer this first challenge on my journey.

I researched tuning a Postgres database, and eventually figured out that a binary-tree index applied to the correct column on my table would speed up my queries. Boy, did it ever. Query speed dropped from 1 minute to 20 ms. It appeared both database’s speed would be adequate, with Postgres being twice as fast. But I needed to consider other factors regarding my back-end before deciding on a database.

Cassandra is known for being much faster with write queries. However, my service only required read queries. So this advantage was useless to me. I knew from my research that I might need to scale my database horizontally in order to increase users per second. Both databases were known to scale well horizontally with read-only queries, so that again made no difference. So, Postgres’ advantage of faster query speed ultimately made the decision for me. I made the decision, and set off once again on my journey.

## Chapter 3. The Road of Trials

With the database decided, and the back-end functioning, it was time to deploy to the web and see what the initial benchmarks looked like. I dockerized my service for easy deployment on an AWS EC2 machine. I also deployed my database, and it was time for the moment of reckoning: how many requests per second could this back-end handle? I took a deep breath and sent loader.io off to do my bidding. The results came back, to the tune of about 150 requests per second.

I understood that all was not easy on the hero’s journey, and there was work to be done to reach the goal of 1000 requests per second. After a moment of reflection, my mind renewed, I set out to reach this lofty goal. I would horizontally scale my service, and use a load balancer to distribute traffic between my different service instances. Brimming with confidence, I set up a load balancer with six different service instances. “6 x 150 = 900 requests per second,” I thought with hope. I ran the loader.io stress tests again. The results: 150 requests per second.

My gut sank. All of this work and no change. What could be the cause of my great misfortune? I checked the error logs on my nginx load balancer. Aha! “Too many open files” and “Max worker connections not enough.” These errors might be the key to solving my conundrum. I consulted the great mages of the internet for advice. After heeding their words, I fixed the errors. No more errors showed on the logs. Was this the moment? Would all be fixed?

## Chapter 4. The Abyss

What good would a hero’s journey be without the abyss? The moment when all seems lost and nothing can fix it. I looked at the new stress test results, and once again, that cursed number: 150. I sat and moped for a minute. It seemed impossible. Maybe I would never truly scale a back-end. Yet in my misery, a vision of a mentor from long ago came to me, and said: “Remember the problem solving process. Proceed logically. Do not let the whims of emotion blind you.”

## Chapter 5. Metamorphosis

I stood up, wiped the metaphorical dirt off my knees and thought, “Well, I guess I’ll give it one more try.” If the load balancer was not the problem, and the service instances were not the problem (as increasing the number had not increased my requests per second), then there was only one thing left to examine: the database. It must be the database!!!

But how to scale this database? Perhaps the simplest way would be to scale it vertically. If I increased the computing power of the database, I thought, maybe I will get more requests per second. So I increased the computing power of my database, from 1 GB of RAM to 4 GB. I ran the tests. Great Scott! My requests per second soared to over 600, a four-fold increase!

In my joy, I attempted to horizontally scale as well. Because my database was read-only, I could safely scale horizontally without worrying too much about streaming replication for the time being. I added a second database instance, and re-ran the tests. A single tear came to my eye as I saw the results appear on the screen: 1300 requests per second.

## Chapter 6. The Ultimate Boon

I had made it. From humble beginnings, and through many trials, the goal of 1000 requests per second had been accomplished. Many things were learned about the scaling of a back-end. Finding a bottleneck can sometimes be very difficult. But if a careful problem solving method is enacted, usually success will follow.

I learned so much on this journey, and I hope you learned something from this highly unusual ReadMe. If you have any questions, feel free to message me (contact in profile). Thanks for reading!

## Tools:

- [PostgreSQL](https://www.postgresql.org/)
- [Cassandra](https://cassandra.apache.org/)
- [NGINX](https://www.nginx.com/)
- [Loader.io](https://loader.io/)

## Contact:

- [Email](matthew.crawford92@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/-matthewcrawford-/)
- [Github](https://github.com/macrawford)
