table1 = readtable("wl3mono1_400.csv");
table2 = readtable("wl3serv1_400.csv");
table3 = readtable("wl3ms1.csv");

xlimit = 200;
ylimit = 12000;

tiledlayout(3,2,'TileSpacing','Compact');

%1
latency = table1.requestResponseLatency;
time_sent = table1.requestTime - table1.requestTime(1);
ax1 = nexttile;
scatter(ax1, time_sent/1000, latency, 3, 'black')
title(ax1,'Scatterplot Monolith')
ylabel(ax1,'Latency (ms)')
xlabel(ax1,'Time (s)')
xline(60,'--',{'Scale','phase'})
xline(120,'--',{'Hold','phase'})
xlim([-1 xlimit])
ylim([-1 ylimit])
%P95
[p95_time_mono,p95_mono, median] = get_json('wl3mono1_400.json');
ax4 = nexttile;
plot(ax4, p95_time_mono/1000, p95_mono,'black','Marker','diamond')
hold on
plot(ax4, p95_time_mono/1000, median,'black','Marker','x')
legend('95th percentile','Median','')
ylabel(ax4,'Latency (ms)')
xlabel(ax4,'Time (s)')
xline(60, '--',{'Scale','phase'},'HandleVisibility','off')
xline(120,'--',{'Hold','phase'},'HandleVisibility','off')
xlim([-1 xlimit])
ylim([0 ylimit])



%2
latency = table2.requestResponseLatency;
time_sent = table2.requestTime - table2.requestTime(1);
ax2 = nexttile;
scatter(ax2, time_sent/1000, latency, 3, 'black')
title(ax2,'Scatterplot Serverless')
ylabel(ax2,'Latency (ms)')
xlabel(ax2,'Time (s)')
xline(60,'--')
xline(120,'--')
xlim([-1 xlimit])
ylim([-1 ylimit])
[p95_time_serv,p95_serv, median] = get_json('wl3serv1_400.json');
ax5 = nexttile;
plot(ax5, p95_time_serv/1000, p95_serv,'black','Marker','diamond')
hold on
plot(ax5, p95_time_serv/1000, median,'black','Marker','x')
legend('95th percentile','Median')
ylabel(ax5,'Latency (ms)')
xlabel(ax5,'Time (s)')
xline(60,'--','HandleVisibility','off')
xline(120,'--','HandleVisibility','off')
xlim([-1 xlimit])
ylim([0 ylimit])


%3
latency = table3.requestResponseLatency;
time_sent = table3.requestTime - table3.requestTime(1);
ax3 = nexttile;
scatter(ax3, time_sent/1000, latency, 3, 'black')
title(ax3,'Scatterplot µServerless')
ylabel(ax3,'Latency (ms)')
xlabel(ax3,'Time (s)')
xline(60,'--','HandleVisibility','off')
xline(120,'--')
xlim([-1 xlimit])
ylim([-1 ylimit])

[p95_time_serv,p95_serv, median] = get_json('wl3ms1.json');
ax6 = nexttile;
h1 = plot(ax6, p95_time_serv/1000, p95_serv,'black','Marker','diamond');
hold on
h2 = plot(ax6, p95_time_serv/1000, median,'black','Marker','x');
legend([h1,h2],'95th percentile','Median')
ylabel(ax6,'Latency (ms)')
xlabel(ax6,'Time (s)')
xline(60,'--','HandleVisibility','off')
xline(120,'--','HandleVisibility','off')
xlim([-1 xlimit])
ylim([0 ylimit])
