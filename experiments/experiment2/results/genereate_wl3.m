table1 = readtable("wl3mono1_400.csv");
table2 = readtable("wl3serv1_400.csv");

latency = table1.requestResponseLatency;
time_sent = table1.requestTime - table1.requestTime(1);

tiledlayout(2,1);
ax1 = nexttile;
scatter(ax1, time_sent/1000, latency, 3)
hold on

latency = table2.requestResponseLatency;
time_sent = table2.requestTime - table2.requestTime(1);
sz = 25;
scatter(ax1, time_sent/1000, latency, 3, 'd')
xlim([-1 180])
ylim([0 10000])
title(ax1,'Scatterplot of Request')
legend('Monolith','Serverless')
ylabel(ax1,'Latency (ms)')
xlabel(ax1,'Time (s)')

% JSON parse

[p95_time_mono,p95_mono] = get_json('wl3mono1_400.json');
ax2 = nexttile;
plot(ax2, p95_time_mono/1000, p95_mono,'-o')
hold on

[p95_time_serv,p95_serv] = get_json('wl3serv1_400.json');

plot(ax2, p95_time_serv/1000, p95_serv,'-d')
title(ax2,'95th Precentile')
ylabel(ax2,'Latency (ms)')
xlabel(ax2,'Time (s)')
xlim([-1 180])
ylim([0 10000])

hold off

