function [time,p95] = get_json(file)
    fid = fopen(file); 
    raw = fread(fid,inf); 
    str = char(raw'); 
    fclose(fid); 
    val = jsondecode(str);
    intervall = val.intermediate;
    intervall(1).timestamp;
    p95 = [];
    time = [];
    for n = 1 : length(intervall)
        if (intervall(n).scenariosCompleted ~= 0)
             p95(end+1) = intervall(n).scenarioDuration.p95;
        end 
    end
    for n = 1 : length(p95)
        time(end+1) = n*10000;
    end
end