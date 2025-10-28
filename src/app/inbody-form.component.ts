import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'inbody-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule, 
    MatIcon
  ],
  templateUrl: './inbody-form.component.html',
  styleUrls: ['./inbody-form.component.css']
})
export class InbodyFormComponent implements OnInit {
  form!: FormGroup;
  generatedUrl = '';
  // per-field scale mapping (multiply input by scale and round)
  private scaleMap: Record<string, { scale: number; pad?: number; sign?: boolean }> = {
    height: { scale: 10 },
    weight: { scale: 10 },
    skeletal_muscle_mass: { scale: 10 },
    body_fat_mass: { scale: 10 },
    BMI: { scale: 10 },
    percent_body_fat: { scale: 10 },
    target_weight: { scale: 10 },
    SMI: { scale: 10 },
    'body_composition_analysis.total_body_water': { scale: 10 },
    'body_composition_analysis.protein': { scale: 10 },
    'body_composition_analysis.mineral': { scale: 10 },
    'body_composition_analysis.fat_free_mass': { scale: 10 },
    'segmental_lean_analysis.trunk': { scale: 10 },
    'segmental_lean_analysis.left_arm': { scale: 10 },
    'segmental_lean_analysis.right_arm': { scale: 10 },
    'segmental_lean_analysis.left_leg': { scale: 10 },
    'segmental_lean_analysis.right_leg': { scale: 10 },
    'segmental_fat_analysis.trunk': { scale: 10 },
    'segmental_fat_analysis.left_arm': { scale: 10 },
    'segmental_fat_analysis.right_arm': { scale: 10 },
    'segmental_fat_analysis.left_leg': { scale: 10 },
    'segmental_fat_analysis.right_leg': { scale: 10 },
    'segmental_lean_percentage.right_arm': { scale: 10 },
    'segmental_lean_percentage.left_arm': { scale: 10 },
    'segmental_lean_percentage.trunk': { scale: 10 },
    'segmental_lean_percentage.right_leg': { scale: 10 },
    'segmental_lean_percentage.left_leg': { scale: 10 },
    'segmental_fat_percentage.right_arm': { scale: 10 },
    'segmental_fat_percentage.left_arm': { scale: 10 },
    'segmental_fat_percentage.trunk': { scale: 10 },
    'segmental_fat_percentage.right_leg': { scale: 10 },
    'segmental_fat_percentage.left_leg': { scale: 10 },
    waist_hip_ratio: { scale: 100, pad: 3 },
    weight_control: { scale: 100, pad: 4, sign: true },
    fat_control: { scale: 100, pad: 4, sign: true },
    muscle_control: { scale: 100, pad: 4, sign: true },
    BMR: { scale: 1 },
    visceral_fat_level: { scale: 1 }
  };

  private getValue(obj: any, path: string) {
    return path.split('.').reduce((acc, p) => (acc && acc[p] !== undefined ? acc[p] : null), obj);
  }

  private fmt(path: string, val: any) {
    if (val === null || val === undefined || val === '') return '';
    const key = path;
    const cfg = this.scaleMap[key];
    const n = Number(val);
    if (Number.isNaN(n)) return String(val);
    if (!cfg) return String(val);
    const scaled = Math.round(n * cfg.scale);
    let s = String(Math.abs(scaled));
    if (cfg.pad) {
      s = s.padStart(cfg.pad, '0');
    }
    if (cfg.sign) {
      return (scaled < 0 ? '-' : '') + s;
    }
    return s;
  }

  private unscale(scaled: any, key: string) {
    if (scaled === null || scaled === undefined || scaled === '') return '';
    const cfg = this.scaleMap[key];
    // if no cfg, just try to parse number
    if (!cfg) {
      const n = Number(scaled);
      return Number.isNaN(n) ? '' : n;
    }
    let s = String(scaled);
    // strip any non-digit except leading -
    const negative = s.trim().startsWith('-');
    s = s.replace(/[^0-9]/g, '');
    const num = Number(s);
    if (Number.isNaN(num)) return '';
    const raw = num / cfg.scale;
    // return string with '.' as decimal separator depending on scale
    let fixedStr: string;
    if (cfg.scale === 10) fixedStr = raw.toFixed(1);
    else if (cfg.scale === 100) fixedStr = raw.toFixed(2);
    else fixedStr = String(Number(raw));
    // ensure decimal point is '.' not a locale-specific comma
    fixedStr = fixedStr.replace(',', '.');
    return cfg.sign && negative ? '-' + fixedStr : fixedStr;
  }

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      user_id: ['', [Validators.required, Validators.minLength(5)]],
      height: [this.unscale('1740', 'height'), Validators.required],
      age: [26, Validators.required],
      time_stamp: this.fb.group({
        year: ['2024', Validators.required],
        month: ['11', Validators.required],
        date: ['29', Validators.required],
        hour: ['11', Validators.required],
        minutes: ['19', Validators.required]
      }),
      weight: [this.unscale('741', 'weight'), Validators.required],
      skeletal_muscle_mass: [this.unscale('332', 'skeletal_muscle_mass'), Validators.required],
      body_fat_mass: [this.unscale('154', 'body_fat_mass'), Validators.required],
      BMI: [this.unscale('245', 'BMI'), Validators.required],
      percent_body_fat: [this.unscale('208', 'percent_body_fat'), Validators.required],
      score: ['77'],
      body_composition_analysis: this.fb.group({
        total_body_water: [this.unscale('430', 'body_composition_analysis.total_body_water')],
        protein: [this.unscale('116', 'body_composition_analysis.protein')],
        mineral: [this.unscale('411', 'body_composition_analysis.mineral')],
        fat_free_mass: [this.unscale('587', 'body_composition_analysis.fat_free_mass')]
      }),
      segmental_lean_analysis: this.fb.group({
        trunk: [this.unscale('267', 'segmental_lean_analysis.trunk')],
        left_arm: [this.unscale('339', 'segmental_lean_analysis.left_arm')],
        right_arm: [this.unscale('338', 'segmental_lean_analysis.right_arm')],
        left_leg: [this.unscale('863', 'segmental_lean_analysis.left_leg')],
        right_leg: [this.unscale('855', 'segmental_lean_analysis.right_leg')]
      }),
      segmental_fat_analysis: this.fb.group({
        trunk: [this.unscale('084', 'segmental_fat_analysis.trunk')],
        left_arm: [this.unscale('008', 'segmental_fat_analysis.left_arm')],
        right_arm: [this.unscale('008', 'segmental_fat_analysis.right_arm')],
        left_leg: [this.unscale('021', 'segmental_fat_analysis.left_leg')],
        right_leg: [this.unscale('021', 'segmental_fat_analysis.right_leg')]
      }),
      segmental_lean_percentage: this.fb.group({
        right_arm: [this.unscale('1035', 'segmental_lean_percentage.right_arm')],
        left_arm: [this.unscale('1038', 'segmental_lean_percentage.left_arm')],
        trunk: [this.unscale('1025', 'segmental_lean_percentage.trunk')],
        right_leg: [this.unscale('0943', 'segmental_lean_percentage.right_leg')],
        left_leg: [this.unscale('0951', 'segmental_lean_percentage.left_leg')]
      }),
      segmental_fat_percentage: this.fb.group({
        right_arm: [this.unscale('1330', 'segmental_fat_percentage.right_arm')],
        left_arm: [this.unscale('1348', 'segmental_fat_percentage.left_arm')],
        trunk: [this.unscale('2003', 'segmental_fat_percentage.trunk')],
        right_leg: [this.unscale('1224', 'segmental_fat_percentage.right_leg')],
        left_leg: [this.unscale('1220', 'segmental_fat_percentage.left_leg')]
      }),
      waist_hip_ratio: [this.unscale('093', 'waist_hip_ratio')],
      target_weight: [this.unscale('690', 'target_weight')],
      weight_control: [this.unscale('-0051', 'weight_control')],
      fat_control: [this.unscale('-0051', 'fat_control')],
      muscle_control: [this.unscale('000', 'muscle_control')],
      BMR: [this.unscale('1637', 'BMR')],
      SMI: [this.unscale('79', 'SMI')],
      visceral_fat_level: [this.unscale('7', 'visceral_fat_level')]
    });
  }

  generate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const d: any = this.form.value;
    const staticVals: any = {
      total_body_water: { min: '374', max: '458' },
      protein: { min: '101', max: '123' },
      minerals: { min: '346', max: '423' },
      body_fat_mass: { min: '080', max: '160' },
      weight: { min: '566', max: '766' }
    };

    // helper: get nested value
    const get = (obj: any, path: string) => {
      return path.split('.').reduce((acc, p) => (acc && acc[p] !== undefined ? acc[p] : null), obj);
    };

    // using class-level formatting helpers (this.fmt)

    // build formatted shortcuts
    const f: any = {
      user: d.user_id || 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
  height: this.fmt('height', d.height),
  age: this.fmt('age', d.age) || String(d.age),
      year: get(d, 'time_stamp.year') || '',
      month: get(d, 'time_stamp.month') || '',
      date: get(d, 'time_stamp.date') || '',
      hour: get(d, 'time_stamp.hour') || '',
      minutes: get(d, 'time_stamp.minutes') || '',
  protein: this.fmt('body_composition_analysis.protein', get(d, 'body_composition_analysis.protein')),
  mineral: this.fmt('body_composition_analysis.mineral', get(d, 'body_composition_analysis.mineral')),
  body_fat_mass: this.fmt('body_fat_mass', d.body_fat_mass),
  total_body_water: this.fmt('body_composition_analysis.total_body_water', get(d, 'body_composition_analysis.total_body_water')),
  fat_free_mass: this.fmt('body_composition_analysis.fat_free_mass', get(d, 'body_composition_analysis.fat_free_mass')),
  weight: this.fmt('weight', d.weight),
  skeletal_muscle_mass: this.fmt('skeletal_muscle_mass', d.skeletal_muscle_mass),
  BMI: this.fmt('BMI', d.BMI),
  percent_body_fat: this.fmt('percent_body_fat', d.percent_body_fat),
  score: this.fmt('score', d.score),
  target_weight: this.fmt('target_weight', d.target_weight),
  weight_control: this.fmt('weight_control', d.weight_control),
  fat_control: this.fmt('fat_control', d.fat_control),
  muscle_control: this.fmt('muscle_control', d.muscle_control),
  BMR: this.fmt('BMR', d.BMR),
  waist_hip_ratio: this.fmt('waist_hip_ratio', d.waist_hip_ratio),
  visceral_fat_level: this.fmt('visceral_fat_level', d.visceral_fat_level),
      seg: {
        r_arm: this.fmt('segmental_lean_analysis.right_arm', get(d, 'segmental_lean_analysis.right_arm')),
        l_arm: this.fmt('segmental_lean_analysis.left_arm', get(d, 'segmental_lean_analysis.left_arm')),
        trunk: this.fmt('segmental_lean_analysis.trunk', get(d, 'segmental_lean_analysis.trunk')),
        r_leg: this.fmt('segmental_lean_analysis.right_leg', get(d, 'segmental_lean_analysis.right_leg')),
        l_leg: this.fmt('segmental_lean_analysis.left_leg', get(d, 'segmental_lean_analysis.left_leg')),
        fr_arm: this.fmt('segmental_fat_analysis.right_arm', get(d, 'segmental_fat_analysis.right_arm')),
        fl_arm: this.fmt('segmental_fat_analysis.left_arm', get(d, 'segmental_fat_analysis.left_arm')),
        ftrunk: this.fmt('segmental_fat_analysis.trunk', get(d, 'segmental_fat_analysis.trunk')),
        fr_leg: this.fmt('segmental_fat_analysis.right_leg', get(d, 'segmental_fat_analysis.right_leg')),
        fl_leg: this.fmt('segmental_fat_analysis.left_leg', get(d, 'segmental_fat_analysis.left_leg'))
      },
      segPct: {
        r_arm: this.fmt('segmental_lean_percentage.right_arm', get(d, 'segmental_lean_percentage.right_arm')),
        l_arm: this.fmt('segmental_lean_percentage.left_arm', get(d, 'segmental_lean_percentage.left_arm')),
        trunk: this.fmt('segmental_lean_percentage.trunk', get(d, 'segmental_lean_percentage.trunk')),
        r_leg: this.fmt('segmental_lean_percentage.right_leg', get(d, 'segmental_lean_percentage.right_leg')),
        l_leg: this.fmt('segmental_lean_percentage.left_leg', get(d, 'segmental_lean_percentage.left_leg')),
        fr_arm: this.fmt('segmental_fat_percentage.right_arm', get(d, 'segmental_fat_percentage.right_arm')),
        fl_arm: this.fmt('segmental_fat_percentage.left_arm', get(d, 'segmental_fat_percentage.left_arm')),
        ftrunk: this.fmt('segmental_fat_percentage.trunk', get(d, 'segmental_fat_percentage.trunk')),
        fr_leg: this.fmt('segmental_fat_percentage.right_leg', get(d, 'segmental_fat_percentage.right_leg')),
        fl_leg: this.fmt('segmental_fat_percentage.left_leg', get(d, 'segmental_fat_percentage.left_leg'))
      },
      SMI: this.fmt('SMI', d.SMI)
    };

    const url = `https://qrcode.inbody.com/?IBData=${f.user}!!!!!!!!!!!!!!!!!!${f.height}0${f.age}0M${f.year}${f.month}${f.date}${f.hour}${f.minutes}050${f.protein}0${staticVals.protein.min}0${staticVals.protein.max}0${f.mineral}0${staticVals.minerals.min}0${staticVals.minerals.max}0${f.body_fat_mass}0${staticVals.body_fat_mass.min}0${staticVals.body_fat_mass.max}0${f.total_body_water}0${staticVals.total_body_water.min}0${staticVals.total_body_water.max}0${f.fat_free_mass}0${f.weight}0${staticVals.weight.min}0${staticVals.weight.max}11130${f.skeletal_muscle_mass}10510${f.body_fat_mass}30${f.BMI}0${f.percent_body_fat}0${f.score}0${f.target_weight}${f.weight_control}${f.fat_control}${f.muscle_control}0${f.BMR}0${f.waist_hip_ratio}008000900${f.visceral_fat_level}920771112765000000000000000000003092306902282908282627542759019225362482PASS00112003850100041603160666000002200150008511112000111111121100910270-2DM-0422!!!!018502500300010002000${f.seg.r_arm}0${f.seg.l_arm}0${f.seg.trunk}0${f.seg.r_leg}0${f.seg.l_leg}0${f.seg.fr_arm}0${f.seg.fl_arm}0${f.seg.ftrunk}0${f.seg.fr_leg}0${f.seg.fl_leg}${f.segPct.r_arm}${f.segPct.l_arm}${f.segPct.trunk}${f.segPct.r_leg}${f.segPct.l_leg}0${f.segPct.fr_arm}0${f.segPct.fl_arm}0${f.segPct.ftrunk}0${f.segPct.fr_leg}0${f.segPct.fl_leg}00${f.SMI}02`;

    this.generatedUrl = url;
  }

  copyToClipboard() {
    if (!this.generatedUrl) return;
    navigator.clipboard?.writeText(this.generatedUrl).then(() => {
      this.snackBar.open('Copied URL to clipboard', undefined, { duration: 1500 });
    }).catch(() => {
      this.snackBar.open('Failed to copy', undefined, { duration: 1500 });
    });
  }

  qrPreviewSrc(url: string) {
    // Use quick Chart API as a simple client-side QR generator
    const encoded = encodeURIComponent(url);
    // return `https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=${encoded}`;
    return `https://quickchart.io/qr?text=${encoded}&size=500`;
  }

  // Upload handling (middle column)
  uploadedFile: File | null = null;
  previewUrl: string | null = null;
  sampleInUse = false;
  // public sample path (file placed in /public)
  samplePublicPath = encodeURI('/Inbody Sample Report.jpg');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.setUploadedFile(file);
  }

  onDrop(evt: DragEvent) {
    evt.preventDefault();
    if (evt.dataTransfer?.files && evt.dataTransfer.files.length) {
      this.setUploadedFile(evt.dataTransfer.files[0]);
    }
  }

  private setUploadedFile(file: File) {
    // Revoke previous object URL if present and not the sample placeholder
    if (this.previewUrl && this.previewUrl.startsWith('blob:') && !this.sampleInUse) {
      try { URL.revokeObjectURL(this.previewUrl); } catch (e) { /* ignore */ }
    }
    this.sampleInUse = false;
    this.uploadedFile = file;
    try {
      this.previewUrl = URL.createObjectURL(file);
    } catch (e) {
      // Fallback to FileReader if createObjectURL is not available
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => { this.previewUrl = String(reader.result || ''); };
        reader.readAsDataURL(file);
      } else {
        this.previewUrl = null;
      }
    }
  }

  clearUpload() {
    if (this.previewUrl && this.previewUrl.startsWith('blob:') && !this.sampleInUse) {
      try { URL.revokeObjectURL(this.previewUrl); } catch (e) { /* ignore */ }
    }
    this.uploadedFile = null;
    this.previewUrl = null;
    this.sampleInUse = false;
  }

  useSample() {
    this.clearUpload();
    this.previewUrl = '/assets/inbody-placeholder.svg';
    this.sampleInUse = true;
  }
}
