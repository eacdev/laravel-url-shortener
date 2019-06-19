<?php

namespace App;

use App\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = [
        'original',
    ];

    protected $hidden = [
        'user_id',
        'id',
        'updated_at',
        'clicks'
    ];

    protected $appends = [
        'short',
        'clicksByMonth'
    ];

    public function addClick()
    {
        $this->clicks()->create([
            'link_id' => $this->id,
        ]);

        //TODO: Job queue instead
    }

    public function clicks()
    {
        return $this->hasMany(Click::class);
    }

    public function getClicksByMonthAttribute()
    {
        $clickmcount = [];
        $clickArr = [];

        foreach ($this->groupClicksByMonth() as $key => $value) {
            $clickmcount[(int)$key] = count($value);
        }

        for ($i = 0; $i <= 11; $i++) {
            if (!empty($clickmcount[$i])) {
                $clickArr[$i] = $clickmcount[$i];
            } else {
                $clickArr[$i] = 0;
            }
        }

        return $clickArr;
    }

    public function groupClicksByMonth()
    {
        return $this->clicks->groupBy(function ($click) {
            return $click->created_at->format('m');
        });
    }

    function getShortAttribute()
    {
        return app()->encoder->encode($this->id);
    }

    public
    function user()
    {
        return $this->belongsTo(User::class);
    }
}
