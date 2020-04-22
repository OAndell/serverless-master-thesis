fid = fopen('Results/results_scen1.json'); 
raw = fread(fid,inf); 
str = char(raw'); 
fclose(fid); 
val = jsondecode(str);

coldstart_zip = extractfield(val.coldstart_zip,'scenario_duration');
warmstart_zip = extractfield(val.warmstart_zip,'scenario_duration');
coldstart_nozip = extractfield(val.coldstart_nozip,'scenario_duration');
warmstart_nozip = extractfield(val.warmstart_nozip,'scenario_duration');
coldstart_ms = extractfield(val.coldstart_ms,'scenario_duration');
warmstart_ms = extractfield(val.warmstart_ms,'scenario_duration'); 
mono = extractfield(val.monolith,'scenario_duration'); 


hold off
figure

subplot(1,4,1)
h = boxplot([coldstart_nozip',warmstart_nozip'],'Widths',0.4,'Whisker',0.7193,'Labels',{'Cold','Warm'},'Colors','k','Symbol','kx');
title({'Serverless' ,'(Non-Package)'},'FontSize',14)
ylabel('Response time (ms)','FontSize',13)
set(gca, 'YScale', 'log')



fix_plot(h,coldstart_nozip, 1);
fix_plot(h,warmstart_nozip, 2);


subplot(1,4,2)
h = boxplot([coldstart_zip',warmstart_zip'],'Widths',0.4,'Whisker',0.7193,'Labels',{'Cold','Warm'},'Colors','k','Symbol','kx');
title({'Serverless' ,'(Package)'},'FontSize',14)
fix_plot(h,coldstart_zip, 1);
fix_plot(h,warmstart_zip, 2);
set(gca, 'YScale', 'log')
 

subplot(1,4,3)
h = boxplot([coldstart_ms',warmstart_ms'], 'Whisker',0.7193,'Widths',0.4,'Labels',{'Cold','Warm'},'Colors','k','Symbol','kx' )
title('µServerless','FontSize',14)
set(gca, 'YScale', 'log')
fix_plot(h,coldstart_ms, 1);
fix_plot(h,warmstart_ms, 2);

subplot(1,4,4)
h = boxplot([mono],'Whisker',1.7193,'Labels',{' '},'Colors','k','Symbol','kx' );
title('Monolith','FontSize',14)
fix_plot(h,mono, 1);
%set(gca, 'YScale', 'log')

meanNoZipCold = [mean(coldstart_nozip), prctile(coldstart_nozip,50), prctile(coldstart_nozip,95)]
meanNoZipWarm = [mean(warmstart_nozip), prctile(warmstart_nozip,50), prctile(warmstart_nozip,95)]
meanZipWarm = [mean(warmstart_zip), prctile(warmstart_zip,50), prctile(warmstart_zip,95)]
meanZipCold = [mean(coldstart_zip), prctile(coldstart_zip,50), prctile(coldstart_zip,95)]
meanMSWarm = [mean(warmstart_ms), prctile(warmstart_ms,50), prctile(warmstart_ms,95)]
meanMScold = [mean(coldstart_ms),prctile(coldstart_ms,50), prctile(coldstart_ms,95) ]
meanMono = [mean(mono), prctile(mono,50), prctile(mono,95)]





function x = fix_plot(h,data, pos)
    set(h(1,pos), 'YData', [prctile(data,95) prctile(data,75)]) 
    set(h(3,pos), 'YData', [prctile(data,95) prctile(data,95)])
    set(h(2,pos), 'YData', [ prctile(data,25) prctile(data,5)]) 
    set(h(4,pos), 'YData', [prctile(data,5) prctile(data,5)])
    ydata = get(h(7,pos), 'Ydata');
    xdata = get(h(7,pos),'Xdata');
    remdata = (ydata <= prctile(data,95)) & (ydata >= prctile(data,5));
    ydata(remdata) = [];
    xdata(remdata) = [];
    set(h,{'linew'},{1.1})
    set(h(6,pos),{'linew'},{2})
    set(h(7,pos),'xdata', xdata, 'YData',ydata);
end

