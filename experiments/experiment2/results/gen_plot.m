table1 = readtable("serverless_zip_scen1.csv");
table2 = readtable("mono_scen1.csv");

latency = table1.requestResponseLatency;
time_sent = table1.requestTime - table1.requestTime(1);

tiledlayout(2,1);
ax1 = nexttile;
scatter(ax1, time_sent, latency)
hold on

latency = table2.requestResponseLatency;
time_sent = table2.requestTime - table2.requestTime(1);
scatter(ax1, time_sent, latency,'filled','d')
xlim([0 250000])
ylim([0 25000])

% JSON parse

fname = 'mono_wl1_scen1.json'; 
fid = fopen(fname); 
raw = fread(fid,inf); 
str = char(raw'); 
fclose(fid); 
val = jsondecode(str);
intervall = val.intermediate;
intervall(1).timestamp;

p95_mono = [];
p95_time_mono = [];
for n = 1 : length(intervall)
    if (intervall(n).scenariosCreated ~= 0)
        p95_mono(end+1)= intervall(n).scenarioDuration.p95;
    end 
end


for n = 1 : length(p95_mono)
    p95_time_mono(end+1) = n*10000;
end
ax2 = nexttile;
plot(ax2, p95_time_mono, p95_mono,'LineWidth',3)
xlim([0 250000])
ylim([0 25000])
hold off

